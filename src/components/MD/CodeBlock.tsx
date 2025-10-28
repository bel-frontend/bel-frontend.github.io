'use client';
import React, { useState, memo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import style from './style.module.scss';

export const CodeBlock = memo(
    ({ language, children }: { language: string; children: string }) => {
        const [copied, setCopied] = useState(false);

        const handleCopy = async () => {
            try {
                await navigator.clipboard.writeText(children);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
            }
        };

        return (
            <div className={style.codeBlock}>
                <div className={style.codeHeader}>
                    <span className={style.language}>{language}</span>
                    <button
                        className={style.copyButton}
                        onClick={handleCopy}
                        aria-label="Copy code"
                    >
                        {copied ? (
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        ) : (
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <rect
                                    x="9"
                                    y="9"
                                    width="13"
                                    height="13"
                                    rx="2"
                                    ry="2"
                                ></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        )}
                        <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                </div>
                {/* @ts-ignore */}
                <SyntaxHighlighter
                    language={language}
                    style={darcula}
                    customStyle={{
                        margin: 0,
                        borderRadius: 0,
                        fontSize: '14px',
                        padding: '1rem',
                        background: '#2b2b2b',
                    }}
                    showLineNumbers={true}
                >
                    {children}
                </SyntaxHighlighter>
            </div>
        );
    },
    (prevProps, nextProps) => {
        return (
            prevProps.language === nextProps.language &&
            prevProps.children === nextProps.children
        );
    },
);

CodeBlock.displayName = 'CodeBlock';
