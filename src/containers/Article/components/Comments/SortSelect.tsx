'use client';
import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useTranslation } from '@/modules/i18next';
import { SortMode } from './utils';

const MODES: SortMode[] = ['best', 'new', 'old'];

export const SortSelect = ({
    value,
    onChange,
}: {
    value: SortMode;
    onChange: (value: SortMode) => void;
}) => {
    const { t } = useTranslation();
    return (
        <ToggleButtonGroup
            exclusive
            size="small"
            value={value}
            onChange={(_, next) => next && onChange(next)}
            aria-label={t('article.comments.sort')}
            sx={{
                '& .MuiToggleButton-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    px: 1.5,
                    py: 0.25,
                    border: 'none',
                    borderRadius: '999px !important',
                    color: 'text.secondary',
                },
                '& .Mui-selected': {
                    color: 'text.primary',
                    bgcolor: 'action.selected',
                },
            }}
        >
            {MODES.map((mode) => (
                <ToggleButton key={mode} value={mode}>
                    {t(`article.comments.sort_${mode}`)}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
};
