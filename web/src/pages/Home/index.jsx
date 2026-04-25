/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React, { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { API, showError } from '../../helpers';
import { useIsMobile } from '../../hooks/common/useIsMobile';
import { StatusContext } from '../../context/Status';
import { useActualTheme } from '../../context/Theme';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Key, Store, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NoticeModal from '../../components/layout/NoticeModal';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [statusState] = useContext(StatusContext);
  const actualTheme = useActualTheme();
  const [homePageContentLoaded, setHomePageContentLoaded] = useState(false);
  const [homePageContent, setHomePageContent] = useState('');
  const [noticeVisible, setNoticeVisible] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const displayHomePageContent = async () => {
    setHomePageContent(localStorage.getItem('home_page_content') || '');
    const res = await API.get('/api/home_page_content');
    const { success, message, data } = res.data;
    if (success) {
      let content = data;
      if (!data.startsWith('https://')) {
        content = marked.parse(data);
      }
      setHomePageContent(content);
      localStorage.setItem('home_page_content', content);

      if (data.startsWith('https://')) {
        const iframe = document.querySelector('iframe');
        if (iframe) {
          iframe.onload = () => {
            iframe.contentWindow.postMessage({ themeMode: actualTheme }, '*');
            iframe.contentWindow.postMessage({ lang: i18n.language }, '*');
          };
        }
      }
    } else {
      showError(message);
      setHomePageContent('加载首页内容失败...');
    }
    setHomePageContentLoaded(true);
  };

  useEffect(() => {
    const checkNoticeAndShow = async () => {
      const lastCloseDate = localStorage.getItem('notice_close_date');
      const today = new Date().toDateString();
      if (lastCloseDate !== today) {
        try {
          const res = await API.get('/api/notice');
          const { success, data } = res.data;
          if (success && data && data.trim() !== '') {
            setNoticeVisible(true);
          }
        } catch (error) {
          console.error('获取公告失败:', error);
        }
      }
    };
    checkNoticeAndShow();
  }, []);

  useEffect(() => {
    displayHomePageContent().then();
  }, []);

  const cards = [
    {
      icon: LayoutDashboard,
      title: t('控制台'),
      desc: t('余额、用量、一目了然'),
      cta: t('前往'),
      path: '/console',
      accent: '#52A876',
    },
    {
      icon: Key,
      title: t('令牌管理'),
      desc: t('获取 API 密钥，即刻开始'),
      cta: t('获取密钥'),
      path: '/console/token',
      accent: '#52A876',
    },
    {
      icon: Store,
      title: t('模型广场'),
      desc: t('浏览模型与定价'),
      cta: t('前往'),
      path: '/pricing',
      accent: '#52A876',
    },
  ];

  return (
    <div className='w-full overflow-x-hidden'>
      <NoticeModal
        visible={noticeVisible}
        onClose={() => setNoticeVisible(false)}
        isMobile={isMobile}
      />
      {homePageContentLoaded && homePageContent === '' ? (
        <div className='w-full overflow-x-hidden'>
          <div className='w-full min-h-[calc(100vh-120px)] relative overflow-hidden home-bg-texture'>
            {/* 背景装饰 */}
            <div className='blur-ball blur-ball-indigo' />
            <div className='blur-ball blur-ball-teal' />

            <div className='relative z-10 flex flex-col items-center justify-center h-full px-4 py-16 md:py-24 lg:py-32'>
              {/* 品牌 Hero */}
              <div className='text-center mb-12 md:mb-16'>
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-semi-color-text-0 mb-4'>
                  {statusState?.status?.system_name || '糯叽叽 API'}
                </h1>
                <p className='text-base md:text-lg text-semi-color-text-2 max-w-md mx-auto tracking-widest'>
                  一念流转，万象生花
                </p>
              </div>

              {/* 三张导航卡片 */}
              <div className={`grid gap-6 md:gap-8 w-full max-w-3xl mx-auto ${isMobile ? 'grid-cols-1 max-w-sm' : 'grid-cols-3'}`}>
                {cards.map((card, idx) => (
                  <TiltCard
                    key={idx}
                    card={card}
                    onClick={() => navigate(card.path)}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='overflow-x-hidden w-full'>
          {homePageContent.startsWith('https://') ? (
            <iframe
              src={homePageContent}
              className='w-full h-screen border-none'
            />
          ) : (
            <div
              className='mt-[60px]'
              dangerouslySetInnerHTML={{ __html: homePageContent }}
            />
          )}
        </div>
      )}
    </div>
  );
};

// 3D Tilt 卡片组件
const TiltCard = ({ card, onClick, isMobile }) => {
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const rafRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (isMobile) return;
    const el = cardRef.current;
    const glare = glareRef.current;
    if (!el) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -14;
      const rotateY = ((x - centerX) / centerX) * 14;

      el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;

      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2) 0%, transparent 55%)`;
        glare.style.opacity = '1';
      }
    });
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    const glare = glareRef.current;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (el) {
      el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    if (glare) {
      glare.style.opacity = '0';
    }
  }, []);

  const Icon = card.icon;

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className='home-tilt-card'
      style={{
        '--card-accent': card.accent,
        transition: 'transform 0.12s ease-out, box-shadow 0.3s ease',
      }}
    >
      {/* Glare overlay */}
      <div
        ref={glareRef}
        className='absolute inset-0 rounded-[24px] pointer-events-none z-10'
        style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
      />

      {/* Card content */}
      <div className='relative z-20 flex flex-col items-center text-center p-8 md:p-10 h-full'>
        <div
          className='w-16 h-16 rounded-[20px] flex items-center justify-center mb-5'
          style={{ backgroundColor: `${card.accent}12` }}
        >
          <Icon size={30} style={{ color: card.accent }} strokeWidth={1.5} />
        </div>

        <h3 className='text-xl font-bold text-semi-color-text-0 mb-2'>
          {card.title}
        </h3>

        <p className='text-sm text-semi-color-text-2 flex-1 mb-6'>
          {card.desc}
        </p>

        {/* CTA 按钮 */}
        <button
          className='home-card-cta'
          style={{
            '--cta-color': card.accent,
          }}
        >
          <span>{card.cta}</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default Home;
