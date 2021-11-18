import { Tooltip } from 'antd';
import _ from 'lodash';
import React from 'react';
import './icon-button.scss';

interface IconButtonProps {
    title: string;
    icon: (props: any) => any;
    iconProps?: any;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent) => any;
    isDark?: boolean;
    isGhost?: boolean;
    style?: React.CSSProperties;
}

const ICON_COLOR = '#24292e';
const DISABLED_ICON_COLOR = '#b7b8bb';

const DARK_ICON_COLOR = 'white';
const DARK_DISABLED_ICON_COLOR = 'white';

const IconButton: React.FC<IconButtonProps> = ({
    title,
    icon,
    iconProps,
    disabled,
    onClick,
    isDark,
    isGhost,
    style,
}: IconButtonProps) => {
    const ButtonIcon = icon;
    const color = disabled ? DISABLED_ICON_COLOR : ICON_COLOR;
    const darkColor = disabled ? DARK_DISABLED_ICON_COLOR : DARK_ICON_COLOR;

    return (
        <Tooltip title={disabled ? undefined : title}>
            <div
                className={`icon-button${disabled ? ' disabled' : ''}${
                    isDark ? ' dark' : ''
                }${isGhost ? 'ghost' : ''}`}
                style={style}
                onClick={
                    !disabled
                        ? (e): void => {
                              e.stopPropagation();
                              onClick?.(e);
                          }
                        : undefined
                }
            >
                <ButtonIcon
                    color={isDark ? darkColor : color}
                    style={{ color: isDark ? darkColor : color }}
                    {...iconProps}
                />
            </div>
        </Tooltip>
    );
};

export default IconButton;
