import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import {
    getArticklesRequest,
    getArticklesSelector,
    searchArticle,
} from 'modules/artickles';

import { EpisodePreview } from './components/EpisodePreview/';
import style from './style.module.scss';
import { getCurrentUserSelector } from 'modules/auth';

const Home = ({
    route: { userIsAuth },
    history,
    location: { search },
    ...props
}: {
    route: { userIsAuth?: boolean };
    [key: string]: any;
}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserSelector);

    React.useEffect(() => {
        const query = new URLSearchParams(search);
        const text = query.get('seacrhText');
        dispatch(searchArticle(text));
    }, [search]);

    const { articles = [] }: any = useSelector(getArticklesSelector);

    const preparedArticles = React.useMemo(() => {
        const pinned = articles.filter((i: any) => i?.meta?.isPinned); //TODO need move that to BE(sort by pinned)
        const non_pinned = articles.filter((i: any) => !i?.meta?.isPinned);
        return [...pinned, ...non_pinned];
    }, [articles]);

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
                        (
                            {
                                content,
                                meta,
                                id,
                                isActive,
                                likes,
                            }: {
                                content: string;
                                meta: any;
                                id: any;
                                isActive: boolean;
                                likes: any;
                            },
                            index: number,
                        ) =>
                            meta ? (
                                <EpisodePreview
                                    currentUser={currentUser}
                                    history={history}
                                    key={index}
                                    userIsAuth={userIsAuth}
                                    content={content}
                                    meta={meta}
                                    id={id}
                                    isActive={isActive}
                                    likes={likes}
                                />
                            ) : null,
                    )}
            </Box>
        </>
    );
};

export default Home;
