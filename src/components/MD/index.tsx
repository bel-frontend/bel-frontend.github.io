import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import style from './style.module.scss';

export const MD = ({ children, className = '' }: any) => {
    return (
        <ReactMarkdown
            className={[style.container, className].join(' ')}
            components={{
                code({ node, inline, className, children, ...props }) {
                    return !inline ? (
                        <SyntaxHighlighter
                            language="javascript"
                            style={darcula}
                        >
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },
            }}
        >
            {children}
        </ReactMarkdown>
    );
};
