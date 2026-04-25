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

/**
 * 主题配置文件
 * 定义所有可用的 UI 主题
 */

export const THEMES = [
    {
        id: 'warm-cream',
        name: '温暖奶油',
        nameEn: 'Warm Cream',
        description: '简洁、温馨、高雅、圆角',
        icon: '🍦',
        tags: ['warm', 'elegant', 'cozy'],
        cssFile: () => import('./warm-cream.css'),
        preview: {
            primary: '#2D6A4F',
            secondary: '#1B4332',
            bg: '#f8f5f0',
        },
    },
];

/**
 * 获取主题配置
 * @param {string} themeId 主题 ID
 * @returns {Object|undefined} 主题配置对象
 */
export function getTheme(themeId) {
    return THEMES.find((theme) => theme.id === themeId);
}

/**
 * 获取所有主题 ID
 * @returns {string[]} 主题 ID 数组
 */
export function getThemeIds() {
    return THEMES.map((theme) => theme.id);
}

/**
 * 获取默认主题
 * @returns {Object} 默认主题配置
 */
export function getDefaultTheme() {
    return THEMES[0];
}

/**
 * 根据标签筛选主题
 * @param {string} tag 标签名称
 * @returns {Object[]} 匹配的主题数组
 */
export function getThemesByTag(tag) {
    return THEMES.filter((theme) => theme.tags.includes(tag));
}

export default THEMES;