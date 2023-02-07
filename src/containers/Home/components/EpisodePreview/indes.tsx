import React from 'react';
import { MetaData } from 'components/MetaData';
import ReactMarkdown from 'react-markdown';
import { parseMeta } from 'helpers';

export const EpisodePreview = ({ data }: any) => {
    const content = 'content';
    const url = './';
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

    return (
        <article className="episode box" id="e{{ episode.data.number }}">
            <div className="article">
                <h2 className="episode__title">
                    <a className="episode__link" href={url}>
                        {data.number}.{data.title}
                    </a>
                </h2>
                <div className="content">
                    <ReactMarkdown children={episode}></ReactMarkdown>
                </div>
            </div>
            <div className="alfa"></div>
            <MetaData meta={meta} />
        </article>
    );
};
