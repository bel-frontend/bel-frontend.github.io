import React from 'react';
import { MetaData } from 'components/MetaData';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { parseMeta } from 'helpers';

export const EpisodePreview = ({ data }: any) => {
    const content = 'content';
    const [episode, setState] = React.useState<any>();
    const [meta, setMeta] = React.useState<any>();

    React.useEffect(() => {
        fetch(data)
            .then((response) => response.text())
            .then((text) => {
                const meta = text.split('---').filter((i) => i);
                setMeta(parseMeta(meta[0]));
                setState(meta[1]);
            });
    }, []);

    const url = meta?.number ? `/article/${meta.number}` : '/';
    console.log(meta, url);

    return meta ? (
        <article className="episode box" id={meta.number}>
            <div className="article">
                <h2 className="episode__title">
                    <Link className="episode__link" to={meta ? url : '/'}>
                        {meta.number}.{meta.title}
                    </Link>
                </h2>
                <div className="content">
                    <ReactMarkdown children={episode}></ReactMarkdown>
                </div>
            </div>
            <div className="alfa"></div>
            <MetaData meta={meta} url={url} />
        </article>
    ) : null;
};
