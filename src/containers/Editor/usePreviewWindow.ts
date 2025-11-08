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
                        * {
                            box-sizing: border-box;
                        }
                        
                        body {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                            padding: 20px;
                            max-width: 900px;
                            margin: 0 auto;
                            line-height: 1.7;
                            color: #333;
                            background: #fff;
                        }

                        #preview-content * {
                            line-height: 1.7;
                            margin: 0 0 0.5rem 0;
                        }

                        /* Headings */
                        h1, h2, h3, h4, h5, h6 {
                            font-weight: 700;
                            line-height: 1.3;
                            margin-top: 1.5rem;
                            margin-bottom: 1rem;
                        }

                        h1:first-child, h2:first-child, h3:first-child,
                        h4:first-child, h5:first-child, h6:first-child {
                            margin-top: 0;
                        }

                        h1 {
                            font-size: 2rem;
                            border-bottom: 2px solid rgba(0, 0, 0, 0.1);
                            padding-bottom: 0.5rem;
                        }

                        h2 {
                            font-size: 1.75rem;
                            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                            padding-bottom: 0.5rem;
                        }

                        h3 {
                            font-size: 1.5rem;
                        }

                        h4 {
                            font-size: 1.25rem;
                        }

                        h5 {
                            font-size: 1.125rem;
                        }

                        h6 {
                            font-size: 1rem;
                        }

                        /* Paragraphs */
                        p {
                            font-size: 1.0625rem;
                            margin-bottom: 1rem;
                        }

                        /* Links */
                        a {
                            text-decoration: underline;
                            transition: opacity 0.2s ease;
                        }

                        a:hover {
                            opacity: 0.8;
                        }

                        /* Lists */
                        ul, ol {
                            padding-left: 1.5rem;
                            margin-bottom: 1rem;
                        }

                        ul li, ol li {
                            margin-bottom: 0.5rem;
                            font-size: 1.0625rem;
                        }

                        ul ul, ul ol, ol ul, ol ol {
                            margin-top: 0.5rem;
                            margin-bottom: 0.5rem;
                        }

                        /* Inline code */
                        code {
                            background-color: rgba(0, 0, 0, 0.05);
                            color: #c7254e;
                            padding: 0.15rem 0.4rem;
                            border-radius: 3px;
                            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
                            font-size: 0.9em;
                        }

                        /* Code blocks */
                        pre {
                            background: #2b2b2b;
                            padding: 12px;
                            border-radius: 6px;
                            overflow-x: auto;
                            margin: 1rem 0;
                            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                        }

                        pre code {
                            background: transparent;
                            color: #f8f8f2;
                            padding: 0;
                        }

                        /* Blockquotes */
                        blockquote {
                            border-left: 4px solid rgba(0, 0, 0, 0.2);
                            padding-left: 1rem;
                            margin-left: 0;
                            margin-right: 0;
                            font-style: italic;
                            background-color: rgba(0, 0, 0, 0.02);
                            padding: 1rem;
                            border-radius: 0 4px 4px 0;
                        }

                        /* Tables */
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            font-size: 0.9375rem;
                            margin: 1.5rem 0;
                            border: 1px solid rgba(0, 0, 0, 0.1);
                            border-radius: 8px;
                            overflow: hidden;
                        }

                        th, td {
                            padding: 0.75rem 1rem;
                            text-align: left;
                            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                        }

                        th {
                            background-color: rgba(0, 0, 0, 0.03);
                            font-weight: 600;
                        }

                        tr:last-child td {
                            border-bottom: none;
                        }

                        tbody tr:hover {
                            background-color: rgba(0, 0, 0, 0.02);
                        }

                        /* Horizontal rule */
                        hr {
                            border: none;
                            border-top: 2px solid rgba(0, 0, 0, 0.1);
                            margin: 2rem 0;
                        }

                        /* Images */
                        img {
                            max-height: 60vh;
                            max-width: 100%;
                            border-radius: 8px;
                            margin: 1.5rem 0;
                            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                            cursor: pointer;
                            transition: opacity 0.2s ease;
                        }

                        img:hover {
                            opacity: 0.8;
                        }

                        /* Strong and emphasis */
                        strong {
                            font-weight: 700;
                        }

                        em {
                            font-style: italic;
                        }

                        /* Mobile responsiveness */
                        @media only screen and (max-width: 768px) {
                            h1 { font-size: 1.875rem; }
                            h2 { font-size: 1.5rem; }
                            h3 { font-size: 1.25rem; }
                            h4 { font-size: 1.125rem; }
                            p, ul li, ol li { font-size: 1rem; }
                        }

                        @media only screen and (max-width: 600px) {
                            img { max-height: 70vh; }
                        }
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
