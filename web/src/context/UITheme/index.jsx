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

import {
    createContext,
    useCallback,
    useContext,
    useState,
    useEffect,
    useRef,
} from 'react';
import { THEMES, getTheme, getDefaultTheme } from '../../styles/themes';

// UI 主题上下文 - 管理样式方案（海洋蓝、森林绿等）
const UIThemeContext = createContext(null);
export const useUITheme = () => useContext(UIThemeContext);

// UI 主题设置上下文
const SetUIThemeContext = createContext(null);
export const useSetUITheme = () => useContext(SetUIThemeContext);

// 已加载的主题样式缓存
const loadedThemes = new Set();

/**
 * UI 主题提供者
 * 管理应用的视觉样式方案（独立于明暗主题）
 */
export const UIThemeProvider = ({ children }) => {
    // 当前 UI 主题 ID
    const [uiThemeId, setUIThemeId] = useState(() => {
        try {
            const saved = localStorage.getItem('ui-theme');
            // 验证保存的主题是否存在
            if (saved && getTheme(saved)) {
                return saved;
            }
        } catch {
            // ignore
        }
        return getDefaultTheme().id;
    });

    // 主题加载状态
    const [isLoading, setIsLoading] = useState(false);

    // 当前主题配置
    const currentTheme = getTheme(uiThemeId) || getDefaultTheme();

    // 加载主题 CSS
    const loadThemeCSS = useCallback(async (themeId) => {
        const theme = getTheme(themeId);
        if (!theme) return false;

        // 如果已经加载过，直接返回
        if (loadedThemes.has(themeId)) {
            return true;
        }

        try {
            setIsLoading(true);
            // 动态导入主题 CSS
            await theme.cssFile();
            loadedThemes.add(themeId);
            return true;
        } catch (error) {
            console.error(`Failed to load theme: ${themeId}`, error);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 切换 UI 主题
    const setUITheme = useCallback(async (themeId) => {
        const theme = getTheme(themeId);
        if (!theme) {
            console.warn(`Theme not found: ${themeId}`);
            return;
        }

        // 移除旧的主题属性
        THEMES.forEach((t) => {
            document.documentElement.removeAttribute(`data-ui-theme-${t.id}`);
        });

        // 加载新主题 CSS
        const loaded = await loadThemeCSS(themeId);
        if (!loaded) return;

        // 设置新的主题属性
        document.documentElement.setAttribute('data-ui-theme', themeId);

        // 更新状态
        setUIThemeId(themeId);
        localStorage.setItem('ui-theme', themeId);
    }, [loadThemeCSS]);

    // 初始化时加载当前主题
    useEffect(() => {
        const initTheme = async () => {
            // 加载基础变量
            await import('../../styles/themes/_variables.css');
            // 加载当前主题
            await setUITheme(uiThemeId);
        };
        initTheme();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // 获取所有可用主题
    const getAvailableThemes = useCallback(() => THEMES, []);

    // 检查主题是否已加载
    const isThemeLoaded = useCallback((themeId) => loadedThemes.has(themeId), []);

    return (
        <SetUIThemeContext.Provider value={setUITheme}>
            <UIThemeContext.Provider
                value={{
                    uiThemeId,
                    currentTheme,
                    isLoading,
                    getAvailableThemes,
                    isThemeLoaded,
                }}
            >
                {children}
            </UIThemeContext.Provider>
        </SetUIThemeContext.Provider>
    );
};

export default UIThemeProvider;