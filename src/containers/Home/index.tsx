import React, { ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@mui/material/Pagination';

import { getArticklesSelector, searchArticle } from 'modules/artickles';
import { EpisodePreview } from './components/EpisodePreview/';
import { getCurrentUserSelector } from 'modules/auth';
import { USER_ROLES } from 'constants/users';

import style from './style.module.scss';

const ARTICLES_PER_PAGE = 5;
const DEFAULT_PAGE_NUM = 1;

const Home = ({
    route: { userIsAuth },
    history,
    location: { search },
    ...props
}: {
    route: { userIsAuth?: boolean };
    [key: string]: any;
}) => {
    const [pageNum, setPageNum] = useState(DEFAULT_PAGE_NUM);
    const dispatch = useDispatch();
    const currentUser: any = useSelector(getCurrentUserSelector);

    React.useEffect(() => {
        const query = new URLSearchParams(search);
        const text = query.get('seacrhText');

        let queryParams: {
            pageNum: number;
            pageSize: number;
            search?: string;
        } = {
            pageNum,
            pageSize: ARTICLES_PER_PAGE,
        };

        if (text) {
            queryParams = { search: text, ...queryParams };
        }

        dispatch(searchArticle(queryParams));
    }, [search, userIsAuth, pageNum]);

    const { articles = [], total }: any = useSelector(getArticklesSelector);

    //add scroll to top
    React.useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // for smoothly scrolling
        });
    }, [articles]);

    const preparedArticles = React.useMemo(() => {
        const pinned = articles.filter((i: any) => i?.meta?.isPinned); //TODO need move that to BE(sort by pinned)
        const non_pinned = articles.filter((i: any) => !i?.meta?.isPinned);
        return [...pinned, ...non_pinned].filter(
            (i) =>
                i.isActive ||
                (!i.isActive && currentUser?.user_id === i?.meta?.user_id) ||
                currentUser.role === USER_ROLES.SUPERADMIN,
        );
    }, [articles]);

    const onChangePaginationNumber = (
        e: ChangeEvent<unknown>,
        pageNumber: number,
    ) => {
        setPageNum(pageNumber);
    };

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

                {!!preparedArticles.length && (
                    <>
                        {preparedArticles.map(
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
                        <Box display={'flex'} justifyContent={'center'}>
                            <Pagination
                                count={Math.ceil(total / ARTICLES_PER_PAGE)}
                                shape="rounded"
                                defaultPage={DEFAULT_PAGE_NUM}
                                color="primary"
                                onChange={onChangePaginationNumber}
                            />
                        </Box>
                    </>
                )}
            </Box>
        </>
    );
};

export default Home;
