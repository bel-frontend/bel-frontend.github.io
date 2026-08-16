'use client';
import React, { memo, useEffect, useId, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { CodeBlock } from './CodeBlock';
import style from './style.module.scss';

const isDarkMode = () =>
    typeof document !== 'undefined' &&
    document.body.classList.contains('dark-mode');

const LINE_NUMBER_PATTERN = /on line (\d+)/i;

const extractMermaidErrorLine = (message: string): number | null => {
    const match = LINE_NUMBER_PATTERN.exec(message);
    if (!match) return null;
    const line = Number(match[1]);
    return Number.isNaN(line) ? null : line;
};

export const Mermaid = memo(({ code }: { code: string }) => {
    const rawId = useId();
    const diagramId = `mermaid-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [dark, setDark] = useState(isDarkMode);

    useEffect(() => {
        const observer = new MutationObserver(() => setDark(isDarkMode()));
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class'],
        });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        let cancelled = false;

        mermaid.initialize({
            startOnLoad: false,
            theme: dark ? 'dark' : 'default',
            suppressErrorRendering: true,
        });

        mermaid
            .render(diagramId, code)
            .then(({ svg }) => {
                if (!cancelled && containerRef.current) {
                    containerRef.current.innerHTML = svg;
                    setError(null);
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : String(err));
                }
            });

        return () => {
            cancelled = true;
        };
    }, [code, dark, diagramId]);

    if (error) {
        const lineNumber = extractMermaidErrorLine(error);
        return (
            <div className={style.mermaidError}>
                <div className={style.mermaidErrorMessage}>
                    {lineNumber !== null && (
                        <span className={style.mermaidErrorLine}>
                            Error on line {lineNumber}
                        </span>
                    )}
                    <pre className={style.mermaidErrorRaw}>{error}</pre>
                </div>
                <CodeBlock language="mermaid">{code}</CodeBlock>
            </div>
        );
    }

    return <div className={style.mermaidBlock} ref={containerRef} />;
});

Mermaid.displayName = 'Mermaid';
