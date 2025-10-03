import React from 'react';
import Box from '@mui/material/Box';
import { cookies } from 'next/headers';

import { ArticleInterface } from '@/modules/artickles/types/article';

import {
    getArticklesRequest,
    getArticklesSelector,
    getPinndedArticklesSelector,
    getPinnedArticlesRequest,
} from '@/modules/artickles';
import { getDataWrapper } from '@/modules/apiRoutes';
import { DEFAULT_LANG } from '@/modules/i18next';

import Pagination from './components/Pagination';
import { EpisodePreview } from './components/EpisodePreview/';
import { TelegramLink } from './components/TelegramLink';

import style from './style.module.scss';

const ARTICLES_PER_PAGE = 10;
const DEFAULT_PAGE_NUM = 1;

// Function to get current language from cookies or localStorage data
const getCurrentLanguage = (): string => {
    try {
        const cookieStore = cookies();

        // Try to get from persist store in cookies
        const persistedState = cookieStore.get('persist:root')?.value;
        if (persistedState) {
            const parsed = JSON.parse(persistedState);
            if (parsed.locale) {
                const localeState = JSON.parse(parsed.locale);
                if (localeState.lang) {
                    return localeState.lang;
                }
            }
        }

        // Fallback to i18nextLng cookie
        const i18nextLng = cookieStore.get('i18nextLng')?.value;
        if (i18nextLng) {
            return i18nextLng;
        }
    } catch (error) {
        console.warn('Error reading language from cookies:', error);
    }

    return DEFAULT_LANG;
};

const Home = async ({
    searchParams: {
        searchText,
        page = DEFAULT_PAGE_NUM,
        size = ARTICLES_PER_PAGE,
    },
}: {
    [key: string]: any;
}) => {
    const currentLang = getCurrentLanguage();

    console.log('🌐 Current language:', currentLang);

    const {
        articles = [],
        total = 0,
    }: {
        articles: ArticleInterface[];
        total: number;
    } = await getDataWrapper(
        {
            requestAction: getArticklesRequest,
            resultSelector: getArticklesSelector,
        },
        {
            search: searchText,
            pageNum: page,
            pageSize: size,
            lang: currentLang,
        },
    );

    const { articles: pinnedArticles } = await getDataWrapper(
        {
            requestAction: getPinnedArticlesRequest,
            resultSelector: getPinndedArticklesSelector,
        },
        { search: searchText, lang: currentLang },
    );

    const preparedArticles = [...pinnedArticles, ...(articles || [])];

    return (
        <>
            <Box component={'main'} className={style.main}>
                <TelegramLink className={style.telegram} />

                {preparedArticles &&
                    preparedArticles.map(
                        (i: ArticleInterface, index: number) => (
                            <EpisodePreview key={index} article={i} />
                        ),
                    )}
                <Pagination total={total} size={size} />
            </Box>
        </>
    );
};

export default Home;
