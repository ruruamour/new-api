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

import React, { useState, useCallback } from 'react';
import {
    Layout,
    Card,
    Button,
    Tag,
    Typography,
    Space,
    Input,
    Select,
    Switch,
    Tabs,
    TabPane,
    Banner,
    Descriptions,
    Table,
    Toast,
} from '@douyinfe/semi-ui';
import {
    IconSun,
    IconMoon,
    IconSetting,
    IconUser,
    IconHome,
    IconList,
    IconStar,
    IconSearch,
    IconDownload,
    IconChevronLeft,
    IconChevronRight,
} from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import { THEMES } from '../../styles/themes';

const { Title, Text, Paragraph } = Typography;
const { Header, Content, Footer, Sider } = Layout;

// 主题选择卡片
const ThemeCard = ({ theme, isActive, onClick, t }) => {
    const handleClick = () => {
        onClick(theme.id);
    };

    return (
        <Card
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${isActive ? 'ring-2 ring-blue-500 shadow-lg' : ''
                }`}
            style={{
                borderRadius: 'var(--radius-lg, 12px)',
                border: isActive
                    ? '2px solid var(--color-primary, #0066CC)'
                    : '1px solid var(--border-color, #E2E8F0)',
            }}
            onClick={handleClick}
        >
            <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{theme.icon}</span>
                <div>
                    <Title heading={5} className="!mb-0">
                        {theme.name}
                    </Title>
                    <Text type="tertiary" size="small">
                        {theme.nameEn}
                    </Text>
                </div>
            </div>

            <Paragraph className="!mb-3" type="secondary" size="small">
                {theme.description}
            </Paragraph>

            {/* 颜色预览 */}
            <div className="flex gap-2 mb-3">
                <div
                    className="w-8 h-8 rounded-lg shadow-sm"
                    style={{ backgroundColor: theme.preview.primary }}
                    title={t('主色')}
                />
                <div
                    className="w-8 h-8 rounded-lg shadow-sm"
                    style={{ backgroundColor: theme.preview.secondary }}
                    title={t('辅助色')}
                />
                <div
                    className="w-8 h-8 rounded-lg shadow-sm border"
                    style={{
                        background: theme.preview.bg,
                        borderColor: 'var(--border-color, #E2E8F0)',
                    }}
                    title={t('背景')}
                />
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-1">
                {theme.tags.slice(0, 3).map((tag) => (
                    <Tag key={tag} size="small" type="light">
                        {tag}
                    </Tag>
                ))}
            </div>

            {isActive && (
                <div className="absolute top-2 right-2">
                    <Tag color="blue" type="solid">
                        {t('当前')}
                    </Tag>
                </div>
            )}
        </Card>
    );
};

// 组件预览区域
const ComponentPreview = ({ t }) => {
    const [inputValue, setInputValue] = useState('');
    const [selectValue, setSelectValue] = useState('option1');
    const [switchChecked, setSwitchChecked] = useState(true);

    // 示例表格数据
    const columns = [
        { title: t('名称'), dataIndex: 'name', key: 'name' },
        {
            title: t('状态'),
            dataIndex: 'status',
            key: 'status',
            render: (text) => (
                <Tag color={text === 'active' ? 'green' : 'red'}>
                    {text === 'active' ? t('启用') : t('禁用')}
                </Tag>
            ),
        },
        {
            title: t('操作'),
            dataIndex: 'operate',
            key: 'operate',
            render: () => (
                <Space>
                    <Button size="small" theme="borderless" type="primary">
                        {t('编辑')}
                    </Button>
                    <Button size="small" theme="borderless" type="danger">
                        {t('删除')}
                    </Button>
                </Space>
            ),
        },
    ];

    const dataSource = [
        { key: '1', name: 'Channel 1', status: 'active' },
        { key: '2', name: 'Channel 2', status: 'inactive' },
        { key: '3', name: 'Channel 3', status: 'active' },
    ];

    return (
        <div className="space-y-6">
            {/* 按钮预览 */}
            <Card title={t('按钮')} className="!rounded-xl">
                <Space wrap>
                    <Button type="primary" theme="solid">
                        {t('主要按钮')}
                    </Button>
                    <Button type="primary" theme="outline">
                        {t('轮廓按钮')}
                    </Button>
                    <Button type="primary" theme="light">
                        {t('浅色按钮')}
                    </Button>
                    <Button type="secondary">{t('次要按钮')}</Button>
                    <Button type="tertiary">{t('三级按钮')}</Button>
                    <Button type="danger">{t('危险按钮')}</Button>
                    <Button type="warning">{t('警告按钮')}</Button>
                    <Button type="success">{t('成功按钮')}</Button>
                </Space>
            </Card>

            {/* 输入组件预览 */}
            <Card title={t('输入组件')} className="!rounded-xl">
                <Space vertical className="w-full" spacing="medium">
                    <Input
                        placeholder={t('请输入内容')}
                        value={inputValue}
                        onChange={setInputValue}
                        prefixIcon={<IconSearch />}
                    />
                    <Select
                        value={selectValue}
                        onChange={setSelectValue}
                        style={{ width: '100%' }}
                    >
                        <Select.Option value="option1">{t('选项一')}</Select.Option>
                        <Select.Option value="option2">{t('选项二')}</Select.Option>
                        <Select.Option value="option3">{t('选项三')}</Select.Option>
                    </Select>
                    <div className="flex items-center gap-2">
                        <Switch checked={switchChecked} onChange={setSwitchChecked} />
                        <Text>{switchChecked ? t('已开启') : t('已关闭')}</Text>
                    </div>
                </Space>
            </Card>

            {/* 标签预览 */}
            <Card title={t('标签')} className="!rounded-xl">
                <Space wrap>
                    <Tag color="blue">{t('蓝色标签')}</Tag>
                    <Tag color="green">{t('绿色标签')}</Tag>
                    <Tag color="orange">{t('橙色标签')}</Tag>
                    <Tag color="red">{t('红色标签')}</Tag>
                    <Tag color="purple">{t('紫色标签')}</Tag>
                    <Tag color="cyan">{t('青色标签')}</Tag>
                </Space>
            </Card>

            {/* 表格预览 */}
            <Card title={t('表格')} className="!rounded-xl">
                <Table columns={columns} dataSource={dataSource} pagination={false} />
            </Card>

            {/* Banner 预览 */}
            <Card title={t('提示')} className="!rounded-xl">
                <Space vertical className="w-full" spacing="medium">
                    <Banner type="info" description={t('这是一条信息提示')} />
                    <Banner type="success" description={t('操作成功完成')} />
                    <Banner type="warning" description={t('请注意检查输入')} />
                    <Banner type="danger" description={t('操作失败，请重试')} />
                </Space>
            </Card>
        </div>
    );
};

// 侧边栏预览
const SidebarPreview = ({ t }) => {
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        { icon: <IconHome />, label: t('首页') },
        { icon: <IconList />, label: t('渠道管理') },
        { icon: <IconUser />, label: t('用户管理') },
        { icon: <IconStar />, label: t('收藏') },
        { icon: <IconSetting />, label: t('设置') },
    ];

    return (
        <Card title={t('侧边栏预览')} className="!rounded-xl">
            <div
                className="flex border rounded-lg overflow-hidden"
                style={{ borderColor: 'var(--border-color, #E2E8F0)' }}
            >
                {/* 侧边栏 */}
                <div
                    className="flex flex-col transition-all duration-300"
                    style={{
                        width: collapsed ? 60 : 180,
                        backgroundColor: 'var(--sidebar-bg, var(--bg-secondary, #F8FAFC))',
                        borderRight: '1px solid var(--sidebar-border, var(--border-color, #E2E8F0))',
                    }}
                >
                    {/* 导航项 */}
                    <div className="flex-1 py-2">
                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-3 px-3 py-2 mx-2 rounded-lg cursor-pointer transition-colors ${index === 1
                                        ? 'bg-blue-500 text-white'
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                {!collapsed && <span className="text-sm">{item.label}</span>}
                            </div>
                        ))}
                    </div>

                    {/* 折叠按钮 */}
                    <div
                        className="p-2 border-t cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                        style={{ borderColor: 'var(--border-color, #E2E8F0)' }}
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <div className="flex justify-center">
                            {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
                        </div>
                    </div>
                </div>

                {/* 内容区 */}
                <div className="flex-1 p-4 bg-white dark:bg-gray-800">
                    <Text type="tertiary">{t('内容区域')}</Text>
                </div>
            </div>
        </Card>
    );
};

// 主预览页面
const ThemePreview = () => {
    const { t } = useTranslation();
    const [currentThemeId, setCurrentThemeId] = useState('ocean-blue');
    const [isLoading, setIsLoading] = useState(false);

    // 获取当前主题
    const currentTheme = THEMES.find((theme) => theme.id === currentThemeId) || THEMES[0];

    // 明暗模式状态
    const [darkMode, setDarkMode] = useState(false);

    // 切换主题
    const handleThemeChange = useCallback(async (themeId) => {
        setIsLoading(true);
        try {
            // 模拟加载延迟
            await new Promise((resolve) => setTimeout(resolve, 300));
            setCurrentThemeId(themeId);
            Toast.success(t('主题已切换'));
        } catch (error) {
            Toast.error(t('主题切换失败'));
        } finally {
            setIsLoading(false);
        }
    }, [t]);

    // 切换明暗模式
    const handleDarkModeToggle = useCallback(() => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.body.setAttribute('theme-mode', 'dark');
            document.documentElement.classList.add('dark');
        } else {
            document.body.removeAttribute('theme-mode');
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // 导出截图
    const handleExportScreenshot = useCallback(() => {
        Toast.info(t('截图功能开发中...'));
    }, [t]);

    return (
        <Layout
            className="min-h-screen"
            style={{ backgroundColor: 'var(--bg-secondary, #F8FAFC)' }}
        >
            <Header
                className="!bg-white dark:!bg-gray-800 !border-b"
                style={{ borderColor: 'var(--border-color, #E2E8F0)' }}
            >
                <div className="flex items-center justify-between h-full px-6">
                    <Title heading={4} className="!m-0">
                        🎨 {t('主题预览')}
                    </Title>
                    <Space>
                        {/* 明暗模式切换 */}
                        <Button
                            theme="borderless"
                            icon={darkMode ? <IconSun /> : <IconMoon />}
                            onClick={handleDarkModeToggle}
                        >
                            {darkMode ? t('浅色') : t('深色')}
                        </Button>

                        {/* 导出截图 */}
                        <Button
                            theme="outline"
                            icon={<IconDownload />}
                            onClick={handleExportScreenshot}
                        >
                            {t('导出截图')}
                        </Button>
                    </Space>
                </div>
            </Header>

            <Content className="p-6">
                <Tabs type="line" size="large">
                    <TabPane tab={t('主题选择')} itemKey="themes">
                        <div className="py-4">
                            {/* 当前主题信息 */}
                            <Banner
                                type="info"
                                icon={null}
                                description={
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl">{currentTheme.icon}</span>
                                        <span>
                                            {t('当前主题')}：{currentTheme.name} ({currentTheme.nameEn})
                                        </span>
                                        <span className="text-gray-400">- {currentTheme.description}</span>
                                    </div>
                                }
                                className="mb-6"
                            />

                            {/* 主题网格 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {THEMES.map((themeItem) => (
                                    <ThemeCard
                                        key={themeItem.id}
                                        theme={themeItem}
                                        isActive={currentThemeId === themeItem.id}
                                        onClick={handleThemeChange}
                                        t={t}
                                    />
                                ))}
                            </div>
                        </div>
                    </TabPane>

                    <TabPane tab={t('组件预览')} itemKey="components">
                        <div className="py-4">
                            <ComponentPreview t={t} />
                        </div>
                    </TabPane>

                    <TabPane tab={t('布局预览')} itemKey="layout">
                        <div className="py-4">
                            <SidebarPreview t={t} />
                        </div>
                    </TabPane>

                    <TabPane tab={t('主题详情')} itemKey="details">
                        <div className="py-4">
                            <Card className="!rounded-xl">
                                <Descriptions>
                                    <Descriptions.Item label={t('主题 ID')}>
                                        {currentTheme.id}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={t('主题名称')}>
                                        {currentTheme.name}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={t('英文名称')}>
                                        {currentTheme.nameEn}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={t('描述')}>
                                        {currentTheme.description}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={t('标签')}>
                                        <Space>
                                            {currentTheme.tags.map((tag) => (
                                                <Tag key={tag}>{tag}</Tag>
                                            ))}
                                        </Space>
                                    </Descriptions.Item>
                                    <Descriptions.Item label={t('主色')}>
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-6 h-6 rounded"
                                                style={{ backgroundColor: currentTheme.preview.primary }}
                                            />
                                            <code className="text-sm">{currentTheme.preview.primary}</code>
                                        </div>
                                    </Descriptions.Item>
                                    <Descriptions.Item label={t('辅助色')}>
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-6 h-6 rounded"
                                                style={{ backgroundColor: currentTheme.preview.secondary }}
                                            />
                                            <code className="text-sm">{currentTheme.preview.secondary}</code>
                                        </div>
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </div>
                    </TabPane>
                </Tabs>
            </Content>

            <Footer className="!bg-white dark:!bg-gray-800 !border-t text-center py-4">
                <Text type="tertiary">
                    {t('主题预览系统')} v1.0 | {t('当前加载状态')}：
                    {isLoading ? t('加载中...') : t('已就绪')}
                </Text>
            </Footer>
        </Layout>
    );
};

export default ThemePreview;