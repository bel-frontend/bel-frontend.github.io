import React from 'react';
import Box from '@mui/material/Box';

import { ArticleInterface } from '@/constants/types/article';
import { UserInterface } from '@/constants/types/user';
import { USER_ROLES } from '@/constants/users';
import {
    getArticklesRequest,
    getArticklesSelector,
    getPinndedArticklesSelector,
    getPinnedArticlesRequest,
} from '@/modules/artickles';
import { getDataWrapper } from '@/modules/apiRoutes';
import { checkUserAccess } from '@/modules/auth';

import Pagination from './components/Pagination';
import { EpisodePreview } from './components/EpisodePreview/';

import style from './style.module.scss';

const ARTICLES_PER_PAGE = 10;
const DEFAULT_PAGE_NUM = 1;

const Home = async ({
    searchParams: {
        searchText,
        page = DEFAULT_PAGE_NUM,
        size = ARTICLES_PER_PAGE,
    },
}: {
    [key: string]: any;
}) => {
    const {
        articles,
        total,
    }: {
        articles: ArticleInterface[];
        total: number;
    } = await getDataWrapper(
        {
            requestAction: getArticklesRequest,
            resultSelector: getArticklesSelector,
        },
        { search: searchText, pageNum: page, pageSize: size },
    );

    const { articles: pinnedArticles } = await getDataWrapper(
        {
            requestAction: getPinnedArticlesRequest,
            resultSelector: getPinndedArticklesSelector,
        },
        { search: searchText },
    );

    const preparedArticles = [...pinnedArticles, ...articles] || [];

    return (
        <>
            <Box component={'main'} className={style.main}>
                <a
                    className={style.telegram}
                    href="https://t.me/bel_frontend"
                    target="_blank"
                    rel="noreferrer"
                >
                    Далучайцеся да нашага Тэлеграм-канала
                </a>

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
