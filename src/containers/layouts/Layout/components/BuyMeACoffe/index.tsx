'use client';
import React from 'react';
import { Typography, Button, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';

const BuyMeACofee = ({ isMobile }: { isMobile: boolean }) => {
    const { t } = useTranslation();

    return (
        <Link target="_blank" href="https://www.buymeacoffee.com/gomanlivesy">
            <Tooltip title={t('buy_me_coffee.tooltip')}>
                <Button
                    startIcon={
                        <Image
                            src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                            alt={t('buy_me_coffee.image_alt')}
                            width={30}
                            height={30}
                        />
                    }
                >
                    <Typography variant="body2" color="primary">
                        {t('buy_me_coffee.button_text')}
                    </Typography>
                </Button>
            </Tooltip>
        </Link>
    );
};

export default BuyMeACofee;
