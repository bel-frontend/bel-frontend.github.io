'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    themeModeSelector,
    setThemeModeAction,
    getEffectiveThemeMode,
    ThemeMode,
} from '@/modules/theme';
import { useTranslation } from '@/modules/i18next';

interface ThemeOption {
    mode: ThemeMode;
    labelKey: string;
    icon: React.ReactNode;
}

const themeOptions: ThemeOption[] = [
    {
        mode: 'light',
        labelKey: 'theme.light',
        icon: <Brightness7Icon fontSize="small" />,
    },
    {
        mode: 'dark',
        labelKey: 'theme.dark',
        icon: <Brightness4Icon fontSize="small" />,
    },
    {
        mode: 'system',
        labelKey: 'theme.system',
        icon: <BrightnessAutoIcon fontSize="small" />,
    },
];

export const ThemeToggle: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const themeMode = useSelector(themeModeSelector);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const effectiveMode = getEffectiveThemeMode(themeMode, prefersDarkMode);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelectTheme = (mode: ThemeMode) => {
        dispatch(setThemeModeAction(mode));
        handleClose();
    };

    const getCurrentIcon = () => {
        if (themeMode === 'system') {
            return <BrightnessAutoIcon />;
        }
        return effectiveMode === 'dark' ? (
            <Brightness4Icon />
        ) : (
            <Brightness7Icon />
        );
    };

    return (
        <>
            <IconButton
                color="inherit"
                onClick={handleClick}
                aria-label={t('theme.toggle')}
                aria-controls={open ? 'theme-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                {getCurrentIcon()}
            </IconButton>
            <Menu
                id="theme-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {themeOptions.map((option) => (
                    <MenuItem
                        key={option.mode}
                        selected={themeMode === option.mode}
                        onClick={() => handleSelectTheme(option.mode)}
                    >
                        <ListItemIcon>{option.icon}</ListItemIcon>
                        <ListItemText>{t(option.labelKey)}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default ThemeToggle;
