import { parseMeta } from 'helpers';
import { articles } from 'articles';

export const getArticles = async (articles: string[]) => {
    return Promise.all(
        articles.map((data, index) => {
            return fetch(data)
                .then((response) => response.text())
                .then((text) => {
                    const meta = text.split('---').filter((i) => i);
                    return {
                        meta: parseMeta(meta[0]),
                        content: meta[1],
                        id: parseMeta(meta[0])?.number.toString(),
                    };
                });
        }),
    );
};

export const getArticleById = async (id: string) => {
    return getAllArticles().then((data) => {
        return data.find((i) => {
            return i.id == id;
        });
    });
};

export const getAllArticles = () => {
    return getArticles(articles);
};
