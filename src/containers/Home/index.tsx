import React from 'react';
import { Layout } from '../layouts/Layout';
import { useTranslation } from 'react-i18next';
import { episodes } from 'episodes';
import { EpisodePreview } from './components/EpisodePreview/indes';

import style from './style.module.css';

export const Home = () => {
    return (
        <Layout>
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
                <div className="pagination_container">Старонка:1</div>
            </main>
        </Layout>
    );
};
