import React from 'react';

import { getAllArticles } from 'modules/articles';
import { EpisodePreview } from './components/EpisodePreview/indes';

import style from './style.module.scss';

export const Home = ({ ...props }) => {
    const [articles, setArticles] = React.useState<any>();
    React.useEffect(() => {
        getAllArticles().then((data) => {
            setArticles(data);
        });
    }, []);

    return (
        <main className={style.main}>
            <div className="box">
                <div className="content"></div>
            </div>
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
                            key={index}
                            content={content}
                            meta={meta}
                            id={id}
                        />
                    ),
                )}
            <div className="pagination_container">Старонка:1</div>
        </main>
    );
};
