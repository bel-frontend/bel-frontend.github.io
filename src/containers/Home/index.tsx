import React from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { getArticklesRequest, getArticklesSelector } from 'modules/artickles';

import { EpisodePreview } from './components/EpisodePreview/indes';
import { Search } from './components/Search';
import style from './style.module.scss';

const Home = ({
    route: { userIsAuth },
    history,
    ...props
}: {
    route: { userIsAuth?: boolean };
    [key: string]: any;
}) => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getArticklesRequest());
    }, []);

    const { total, articles }: any = useSelector(getArticklesSelector);

    const [searchText, setSearchText] = React.useState<string | undefined>('');

    const preparedArticles = React.useMemo(() => {
        if (searchText) {
            return articles.filter(
                (i: any) =>
                    i?.meta?.title &&
                    i?.meta?.title
                        .toLowerCase()
                        .indexOf(searchText.trim().toLowerCase()) !== -1,
            );
        }
        return articles;
    }, [articles, searchText]);

    return (
        <Box component={'main'} className={style.main}>
            <a
                className={style.telegram}
                href="https://t.me/bel_frontend"
                target="_blank"
                rel="noreferrer"
            >
                Далучайцеся да нашага тэлеграмканалу
            </a>
            <Search
                onChange={(text) => setSearchText(text)}
                value={searchText}
                onClear={() => setSearchText('')}
            />
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
                    ) => (
                        <EpisodePreview
                            history={history}
                            key={index}
                            userIsAuth={userIsAuth}
                            content={content}
                            meta={meta}
                            id={id}
                            isActive={isActive}
                            likes={likes}
                        />
                    ),
                )}
        </Box>
    );
};

export default Home;
