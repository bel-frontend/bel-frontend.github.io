import { useState, useCallback, useEffect } from 'react';
import MarkdownIt from 'markdown-it';

const mdParser = new MarkdownIt({ typographer: true });

interface UsePreviewWindowProps {
    previewContent: string;
    title: string;
}

/**
 * Custom hook for managing preview window
 * Opens a new window with live markdown preview that syncs with editor content
 */
export const usePreviewWindow = ({
    previewContent,
    title,
}: UsePreviewWindowProps) => {
    const [previewWindow, setPreviewWindow] = useState<Window | null>(null);

    const openPreviewWindow = useCallback(() => {
        const width = 900;
        const height = 800;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        const newWindow = window.open(
            '',
            'PreviewWindow',
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`,
        );

        if (newWindow) {
            newWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${title}</title>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                            padding: 20px;
                            max-width: 900px;
                            margin: 0 auto;
                            line-height: 1.6;
                            color: #333;
                            background: #fff;
                        }
                        img {
                            max-width: 100%;
                            height: auto;
                            cursor: pointer;
                            border-radius: 4px;
                        }
                        pre {
                            background: #f5f5f5;
                            padding: 12px;
                            border-radius: 4px;
                            overflow-x: auto;
                        }
                        code {
                            background: #f5f5f5;
                            padding: 2px 6px;
                            border-radius: 3px;
                            font-size: 0.9em;
                            font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
                            color: #d63384;
                        }
                        pre code {
                            background: transparent;
                            padding: 0;
                        }
                        a {
                            color: #1976d2;
                            text-decoration: none;
                        }
                        a:hover {
                            text-decoration: underline;
                        }
                        table {
                            border-collapse: collapse;
                            width: 100%;
                            margin: 16px 0;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f5f5f5;
                            font-weight: 600;
                        }
                        blockquote {
                            border-left: 4px solid #ddd;
                            padding-left: 16px;
                            margin-left: 0;
                            color: #666;
                        }
                        h1, h2, h3, h4, h5, h6 {
                            margin-top: 24px;
                            margin-bottom: 16px;
                            font-weight: 600;
                            line-height: 1.25;
                        }
                        h1 { font-size: 2em; }
                        h2 { font-size: 1.5em; }
                        h3 { font-size: 1.25em; }
                    </style>
                </head>
                <body>
                    <div id="preview-content"></div>
                    <script>
                        window.addEventListener('message', function(event) {
                            if (event.origin !== window.location.origin) return;
                            if (event.data.type === 'UPDATE_PREVIEW') {
                                const previewDiv = document.getElementById('preview-content');
                                if (previewDiv) {
                                    previewDiv.innerHTML = event.data.content;
                                }
                            }
                        });
                    </script>
                </body>
                </html>
            `);
            newWindow.document.close();

            // Send initial content
            setTimeout(() => {
                newWindow.postMessage(
                    {
                        type: 'UPDATE_PREVIEW',
                        content: mdParser.render(previewContent),
                    },
                    window.location.origin,
                );
            }, 100);

            setPreviewWindow(newWindow);

            // Check if window is closed
            const checkWindowClosed = setInterval(() => {
                if (newWindow.closed) {
                    setPreviewWindow(null);
                    clearInterval(checkWindowClosed);
                }
            }, 500);
        }
    }, [previewContent, title]);

    // Update preview content when it changes
    useEffect(() => {
        if (previewWindow && !previewWindow.closed && previewContent) {
            const renderedHtml = mdParser.render(previewContent);
            previewWindow.postMessage(
                { type: 'UPDATE_PREVIEW', content: renderedHtml },
                window.location.origin,
            );
        }
    }, [previewContent, previewWindow]);

    // Cleanup preview window on unmount
    useEffect(() => {
        return () => {
            if (previewWindow && !previewWindow.closed) {
                previewWindow.close();
            }
        };
    }, [previewWindow]);

    return {
        previewWindow,
        openPreviewWindow,
        isPreviewWindowOpen: previewWindow !== null && !previewWindow.closed,
    };
};
