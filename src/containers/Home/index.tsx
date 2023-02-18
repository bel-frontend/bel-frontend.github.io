import React from 'react';
import Box from '@mui/material/Box';
import { EpisodePreview } from './components/EpisodePreview/indes';
import { getArticlesFromDB } from 'modules/firebase';
import Button from '@mui/material/Button';
import style from './style.module.scss';

export const Home = ({
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
                {articles &&
                    articles.map(
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
            {userIsAuth ? (
                <Box className={style.artickleAdd}>
                    <Button
                        variant="contained"
                        className={style.button}
                        onClick={() => {
                            history.push('/editor/add');
                        }}
                    >
                        Дадаць новы артыкул
                    </Button>
                </Box>
            ) : null}
        </>
    );
};
