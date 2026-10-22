'use client';
import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from '@/components/MD/CodeBlock';
// shared article styles for code blocks and inline code
import mdStyle from '@/components/MD/style.module.scss';
import style from './style.module.scss';

// headings and images are too heavy for comments: render their content as text
const DISALLOWED = ['img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr'];

const components = {
    code({ inline, className, children, ...props }: any) {
        const match = /language-(\w+)/.exec(className || '');
        const codeString = String(children).replace(/\n$/, '');
        return inline ? (
            <code className={mdStyle.inlineCode} {...props}>
                {children}
            </code>
        ) : (
            <CodeBlock language={match ? match[1] : 'text'}>
                {codeString}
            </CodeBlock>
        );
    },
    a({ children, href }: any) {
        return (
            <a
                href={href}
                target="_blank"
                rel="nofollow ugc noopener noreferrer"
            >
                {children}
            </a>
        );
    },
};

export const CommentMarkdown = memo(({ children }: { children: string }) => (
    <div className={`${mdStyle.container} ${style.markdown}`}>
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            disallowedElements={DISALLOWED}
            unwrapDisallowed
            components={components}
        >
            {children}
        </ReactMarkdown>
    </div>
));

CommentMarkdown.displayName = 'CommentMarkdown';
