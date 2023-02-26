import React from 'react';
import Box from '@mui/material/Box';
import { getArticlesFromDB } from 'modules/firebase';

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
    const [articles, setArticles] = React.useState<any>();
    React.useEffect(() => {
        console.log('read artickles');

        getArticlesFromDB().then((data: any[]) => {
            try {
                const articles = Object.entries(data)
                    .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
                    .map((i, index) => {
                        return {
                            content: i[1].article,
                            id: i[0],
                            meta: i[1].meta,
                            isActive: Boolean(i[1].meta.isActive),
                        };
                    })
                    .filter((i) => userIsAuth || i.isActive);
                setArticles(articles);
            } catch (error) {}

            console.log(articles);
        });
    }, []);
    const [searchText, setSearchText] = React.useState<string | undefined>('');

    const preparedArticles = React.useMemo(() => {
        console.log(articles);

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
        <>
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
                            }: {
                                content: string;
                                meta: any;
                                id: any;
                                isActive: boolean;
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
                            />
                        ),
                    )}
            </Box>
        </>
    );
};

export default Home;
