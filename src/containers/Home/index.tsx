import React from 'react';

import { getAllArticles } from 'modules/articles';
import { EpisodePreview } from './components/EpisodePreview/indes';

import style from './style.module.css';

export const Home = ({ ...props }) => {
    const [articles, setArticles] = React.useState<any>();
    React.useEffect(() => {
        getAllArticles().then((data) => {
            setArticles(data);
        });
    }, []);

    return (
        <main className="page__main main">
            <div className="main__intro box">
                <div className="content"></div>
            </div>
            <a
                className="telegram box box--compact"
                href="https://t.me/bel_frontend"
                target="_blank"
                rel="noreferrer"
            >
                Далучайцеся да нашага тэлеграмканалу
            </a>
            {articles &&
                articles.map(
                    (
                        { content, meta }: { content: string; meta: any },
                        index: number,
                    ) => (
                        <EpisodePreview
                            key={index}
                            content={content}
                            meta={meta}
                        />
                    ),
                )}
            <div className="pagination_container">Старонка:1</div>
        </main>
    );
};
