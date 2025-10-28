import React, { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './CodeBlock';
import style from './style.module.scss';

export const MD = memo(({ children, className = '' }: any) => {
    const components = useMemo(
        () => ({
            code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : 'text';
                const codeString = String(children).replace(/\n$/, '');

                return !inline ? (
                    <CodeBlock language={language}>{codeString}</CodeBlock>
                ) : (
                    <code className={style.inlineCode} {...props}>
                        {children}
                    </code>
                );
            },
            a({ children, href, ...props }: any) {
                return (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                    >
                        {children}
                    </a>
                );
            },
        }),
        [],
    );

    return (
        <ReactMarkdown
            className={[style.container, className].join(' ')}
            remarkPlugins={[remarkGfm]}
            components={components}
        >
            {children}
        </ReactMarkdown>
    );
});

MD.displayName = 'MD';
