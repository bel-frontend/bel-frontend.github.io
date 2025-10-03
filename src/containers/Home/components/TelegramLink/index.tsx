'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const TelegramLink = ({ className }: { className?: string }) => {
    const { t } = useTranslation();

    return (
        <a
            className={className}
            href="https://t.me/bel_frontend"
            target="_blank"
            rel="noreferrer"
        >
            {t('home.telegram_link')}
        </a>
    );
};
