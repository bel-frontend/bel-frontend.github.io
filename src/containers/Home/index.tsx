import React from 'react';
import { Layout } from '../Layout';
import { useTranslation } from 'react-i18next';
import { episodes } from 'src/episodes';
import { EpisodePreview } from './components/EpisodePreview/indes';

import style from './style.module.css';

export const Home = () => {
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                        <main className="page__main main">
                            <div className="main__intro box">
                                <div className="content"></div>
                            </div>
                            <a
                                className="telegram box box--compact"
                                href="https://t.me/bel_frontend"
                            >
                                Далучайцеся да нашага тэлеграмканалу
                            </a>
                            {episodes.map((i) => (
                                <EpisodePreview data={i} />
                            ))}
                            <div className="pagination_container">
                                Старонка:1
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
