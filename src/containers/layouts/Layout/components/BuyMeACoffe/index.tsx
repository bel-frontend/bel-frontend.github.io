'use client';
import React from 'react';
import { Typography, Button, Tooltip } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const BuyMeACofee = ({ isMobile }: { isMobile: boolean }) => {
    return (
        <Link target="_blank" href="https://www.buymeacoffee.com/gomanlivesy">
            <Tooltip title="Збіраем на падтрымку інфраструктуры і паляпшэнне нашага сайту">
                <Button
                    startIcon={
                        <Image
                            src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
                            alt="На каву"
                            width={30}
                            height={30}
                        />
                    }
                >
                    <Typography variant="body2" color="primary">
                        на падтрымку праекта
                    </Typography>
                </Button>
            </Tooltip>
        </Link>
    );
};

export default BuyMeACofee;
