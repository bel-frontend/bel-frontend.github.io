'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import { saveLocaleAction, localeSelector } from '@/modules/i18next';
import i18n from '@/modules/translations';

const languages = [
    { code: 'en', label: 'English' },
    { code: 'be', label: 'Беларуская' },
];

export const LanguageSwitcher = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const dispatch = useDispatch();
    const currentLocale = useSelector(localeSelector) || i18n.language;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChange = (langCode: string) => {
        console.log('🌍 Changing language to:', langCode);
        console.log('Current i18n language:', i18n.language);

        // Змяняем мову ў i18next
        i18n.changeLanguage(langCode).then(() => {
            console.log('✅ Language changed successfully to:', i18n.language);
        });

        // Захоўваем у Redux
        dispatch(saveLocaleAction(langCode));

        // Захоўваем у localStorage для надзейнасці
        if (typeof window !== 'undefined') {
            localStorage.setItem('i18nextLng', langCode);
            console.log('💾 Language saved to localStorage:', langCode);
        }

        handleClose();
    };

    const currentLanguage = languages.find(
        (lang) => lang.code === currentLocale,
    );
    const { t } = useTranslation();

    return (
        <>
            <Tooltip title={t('language_switcher.tooltip')}>
                <IconButton
                    onClick={handleClick}
                    size="large"
                    aria-label="language switcher"
                    color="inherit"
                >
                    <LanguageIcon />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
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
                {languages.map((lang) => (
                    <MenuItem
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        selected={lang.code === currentLocale}
                    >
                        {lang.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default LanguageSwitcher;
