'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import GitHubIcon from '@mui/icons-material/GitHub';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import CasinoRoundedIcon from '@mui/icons-material/CasinoRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import ChildCareRoundedIcon from '@mui/icons-material/ChildCareRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import { useTranslation } from '@/modules/i18next';

import style from './style.module.scss';

const PROJECTS = [
    {
        key: 'composer',
        url: 'https://composer.bel-geek.com',
        repoUrl: 'https://github.com/bel-frontend/tg_discord_bot',
        Icon: EditNoteRoundedIcon,
        from: '#8b5cf6',
        to: '#6d28d9',
    },
    {
        key: 'dnd',
        url: 'https://dnd.bel-geek.com',
        repoUrl: undefined,
        Icon: CasinoRoundedIcon,
        from: '#f97316',
        to: '#dc2626',
    },
    {
        key: 'goman',
        url: 'https://goman.live',
        repoUrl: undefined,
        Icon: TranslateRoundedIcon,
        from: '#06b6d4',
        to: '#0ea5e9',
    },
    {
        key: 'passcv',
        url: 'https://passcv.app',
        repoUrl: undefined,
        Icon: DescriptionRoundedIcon,
        from: '#22c55e',
        to: '#15803d',
    },
    {
        key: 'zaspa',
        url: 'https://zaspa.online',
        repoUrl: undefined,
        Icon: ChildCareRoundedIcon,
        from: '#ec4899',
        to: '#a21caf',
    },
    {
        key: 'discord',
        url: 'https://discord.gg/TDuFF4kAJ4',
        repoUrl: 'https://github.com/bel-frontend/tg_discord_bot',
        Icon: ForumRoundedIcon,
        from: '#5865f2',
        to: '#4752c4',
    },
] as const;

const AUTOPLAY_INTERVAL_MS = 4500;

const getHost = (url: string) => url.replace(/^https?:\/\//, '');

export const Projects = () => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval>>();

    const goTo = useCallback((index: number) => {
        setActiveIndex((index + PROJECTS.length) % PROJECTS.length);
    }, []);

    const goToNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
    const goToPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        if (isPaused || prefersReducedMotion || PROJECTS.length <= 1) {
            return undefined;
        }

        timerRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
        }, AUTOPLAY_INTERVAL_MS);

        return () => clearInterval(timerRef.current);
    }, [isPaused, activeIndex]);

    return (
        <Box
            className={style.projects}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            role="region"
            aria-roledescription="carousel"
            aria-label={t('home.projects_title')}
        >
            <Box className={style.viewport}>
                <Box
                    className={style.track}
                    style={{
                        transform: `translateX(-${activeIndex * 100}%)`,
                    }}
                >
                    {PROJECTS.map(({ key, url, repoUrl, Icon, from, to }) => (
                        <div
                            key={key}
                            className={style.slide}
                            style={
                                {
                                    '--accent-from': from,
                                    '--accent-to': to,
                                } as React.CSSProperties
                            }
                        >
                            <span className={style.icon}>
                                <Icon fontSize="inherit" />
                            </span>

                            <span className={style.body}>
                                <span className={style.eyebrow}>
                                    {t('home.projects_title')}
                                </span>
                                <span className={style.nameRow}>
                                    <span className={style.name}>
                                        {t(`home.projects.${key}_name`)}
                                    </span>
                                    <span className={style.host}>
                                        {getHost(url)}
                                    </span>
                                </span>
                                <span className={style.description}>
                                    {t(`home.projects.${key}_description`)}
                                </span>
                                {repoUrl && (
                                    <a
                                        className={style.repoLink}
                                        href={repoUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <GitHubIcon
                                            className={style.repoLinkIcon}
                                        />
                                        {t('home.projects_code')}
                                    </a>
                                )}
                            </span>

                            <a
                                className={style.cta}
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {t('home.projects_cta')}
                                <ArrowOutwardIcon className={style.ctaIcon} />
                            </a>
                        </div>
                    ))}
                </Box>

                <IconButton
                    className={`${style.arrow} ${style.prev}`}
                    onClick={goToPrev}
                    size="small"
                    aria-label={t('home.projects_prev')}
                >
                    <ChevronLeftIcon />
                </IconButton>

                <IconButton
                    className={`${style.arrow} ${style.next}`}
                    onClick={goToNext}
                    size="small"
                    aria-label={t('home.projects_next')}
                >
                    <ChevronRightIcon />
                </IconButton>

                <Box className={style.progress}>
                    {PROJECTS.map(({ key }, index) => (
                        <button
                            key={key}
                            type="button"
                            className={style.segment}
                            onClick={() => goTo(index)}
                            aria-label={t(`home.projects.${key}_name`)}
                            aria-current={index === activeIndex}
                        >
                            <span
                                className={`${style.segmentFill} ${
                                    index < activeIndex
                                        ? style.segmentFilled
                                        : ''
                                } ${
                                    index === activeIndex
                                        ? style.segmentActive
                                        : ''
                                }`}
                                style={{
                                    animationDuration: `${AUTOPLAY_INTERVAL_MS}ms`,
                                    animationPlayState: isPaused
                                        ? 'paused'
                                        : 'running',
                                }}
                            />
                        </button>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};
