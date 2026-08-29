'use client';
import React, { memo, useEffect, useId, useMemo, useState } from 'react';
import mermaid from 'mermaid';
import { CodeBlock } from './CodeBlock';
import { Popup } from '../Popup';
import style from './style.module.scss';

const isDarkMode = () =>
    typeof document !== 'undefined' &&
    document.body.classList.contains('dark-mode');

const LINE_NUMBER_PATTERN = /on line (\d+)/i;
const SVG_WIDTH_PATTERN = /max-width:\s*([\d.]+)px/;
const MODAL_ZOOM = 1.6;

const extractMermaidErrorLine = (message: string): number | null => {
    const match = LINE_NUMBER_PATTERN.exec(message);
    if (!match) return null;
    const line = Number(match[1]);
    return Number.isNaN(line) ? null : line;
};

export const Mermaid = memo(({ code }: { code: string }) => {
    const rawId = useId();
    const diagramId = `mermaid-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
    const [svg, setSvg] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [dark, setDark] = useState(isDarkMode);
    const [zoomOpen, setZoomOpen] = useState(false);

    const zoomedWidth = useMemo(() => {
        if (!svg) return null;
        const match = SVG_WIDTH_PATTERN.exec(svg);
        return match ? Number(match[1]) * MODAL_ZOOM : null;
    }, [svg]);

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
            .then(({ svg: renderedSvg }) => {
                if (!cancelled) {
                    setSvg(renderedSvg);
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

    return (
        <>
            <div
                className={style.mermaidBlock}
                onClick={() => svg && setZoomOpen(true)}
                dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
            />

            <Popup
                showPopup={zoomOpen}
                onCancel={() => setZoomOpen(false)}
                onClear={() => setZoomOpen(false)}
                showClear={true}
                showSubmit={false}
                showCancel={false}
                className={style.mermaidModal}
                classes={{
                    dataContainer: style.mermaidModalContent,
                    root: style.mermaidModalRoot,
                    clear: style.mermaidModalClear,
                    clearButton: style.mermaidModalClearButton,
                }}
            >
                <div
                    className={style.mermaidModalSvg}
                    style={zoomedWidth ? { width: zoomedWidth } : undefined}
                    dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
                />
            </Popup>
        </>
    );
});

Mermaid.displayName = 'Mermaid';
