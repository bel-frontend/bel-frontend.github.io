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
    console.log(userIsAuth);

    const [articles, setArticles] = React.useState<any>();
    React.useEffect(() => {
        getArticlesFromDB().then((data: any[]) => {
            setArticles(
                data
                    .map((i, index) => {
                        return {
                            content: i.article,
                            id: index,
                            meta: i.meta,
                        };
                    })
                    .filter((i) => i.content),
            );
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
                            }: { content: string; meta: any; id: any },
                            index: number,
                        ) => (
                            <EpisodePreview
                                history={history}
                                key={index}
                                userIsAuth={userIsAuth}
                                content={content}
                                meta={meta}
                                id={id}
                            />
                        ),
                    )}
            </Box>{' '}
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
