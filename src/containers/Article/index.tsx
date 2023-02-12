import React from 'react';
import ReactMarkdown from 'react-markdown';

import { getArticleById } from 'modules/articles';

export const Article = ({
    match: {
        params: { id },
    },
    ...props
}: {
    match: { params: { id: string } };
}) => {
    const [article, setArticle] = React.useState<any>();

    React.useEffect(() => {
        getArticleById(id).then((data) => {
            setArticle(data);
        });
    }, [id]);

    return (
        <main className="page__main main">
            <article className="episode box">
                <h1 className="episode__title">
                    {article?.meta?.number}.{article?.meta?.title}
                </h1>
                <div className="content">
                    <ReactMarkdown>{article?.content}</ReactMarkdown>
                </div>
                <div>
                    <span className="author">{article?.meta?.author}</span>,
                    <span className="date-article">
                        {article?.meta?.dateArticle}
                    </span>
                </div>
            </article>
        </main>
    );
};
