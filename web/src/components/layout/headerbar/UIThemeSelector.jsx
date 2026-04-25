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

import React, { useState, useRef, useEffect } from 'react';
import { Button, Dropdown } from '@douyinfe/semi-ui';
import { IconSetting } from '@douyinfe/semi-icons';
import { useUITheme, useSetUITheme } from '../../../context/UITheme';
import { THEMES } from '../../../styles/themes';

const UIThemeSelector = ({ t }) => {
    const { uiThemeId } = useUITheme();
    const setUITheme = useSetUITheme();
    const [visible, setVisible] = useState(false);

    const currentTheme = THEMES.find((t) => t.id === uiThemeId) || THEMES[0];

    const themeItems = THEMES.map((theme) => ({
        node: (
            <div
                className={`flex items-center gap-3 px-2 py-1.5 cursor-pointer rounded-lg transition-colors ${uiThemeId === theme.id
                    ? 'bg-semi-color-primary-bg'
                    : 'hover:bg-semi-color-fill-0'
                    }`}
                onClick={() => {
                    setUITheme(theme.id);
                    setVisible(false);
                }}
            >
                <span className="text-lg">{theme.icon}</span>
                <div className="flex flex-col">
                    <span className="text-sm font-medium">{theme.name}</span>
                    <span className="text-xs text-semi-color-text-2">
                        {theme.description}
                    </span>
                </div>
                {uiThemeId === theme.id && (
                    <span className="ml-auto text-semi-color-primary">✓</span>
                )}
            </div>
        ),
    }));

    return (
        <Dropdown
            visible={visible}
            onVisibleChange={setVisible}
            trigger="click"
            position="bottomRight"
            render={
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2 min-w-[200px] max-h-[400px] overflow-y-auto">
                    <div className="text-xs text-semi-color-text-2 px-2 py-1.5 border-b border-gray-100 dark:border-gray-700 mb-1">
                        {t ? t('选择主题风格') : '选择主题风格'}
                    </div>
                    <div className="flex flex-col gap-1">
                        {THEMES.map((theme) => (
                            <div
                                key={theme.id}
                                className={`flex items-center gap-3 px-2 py-2 cursor-pointer rounded-lg transition-colors ${uiThemeId === theme.id
                                    ? 'bg-semi-color-primary-bg'
                                    : 'hover:bg-semi-color-fill-0'
                                    }`}
                                onClick={() => {
                                    setUITheme(theme.id);
                                    setVisible(false);
                                }}
                            >
                                <span className="text-lg">{theme.icon}</span>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{theme.name}</span>
                                    <span className="text-xs text-semi-color-text-2">
                                        {theme.description}
                                    </span>
                                </div>
                                {uiThemeId === theme.id && (
                                    <span className="ml-auto text-semi-color-primary">✓</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            }
        >
            <Button
                icon={<IconSetting />}
                theme="borderless"
                type="tertiary"
                className="!text-semi-color-text-2 hover:!text-semi-color-text-0"
                aria-label={t ? t('切换主题风格') : '切换主题风格'}
            >
                {t ? t('主题') : '主题'}
            </Button>
        </Dropdown>
    );
};

export default UIThemeSelector;