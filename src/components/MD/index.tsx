'use client';
import React, { memo, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './CodeBlock';
import { Popup } from '../Popup';
import style from './style.module.scss';

export const MD = memo(({ children, className = '' }: any) => {
    const [imageModal, setImageModal] = useState<{
        isOpen: boolean;
        src: string;
        alt: string;
    }>({
        isOpen: false,
        src: '',
        alt: '',
    });

    const handleImageClick = (src: string, alt: string) => {
        setImageModal({
            isOpen: true,
            src,
            alt,
        });
    };

    const handleCloseModal = () => {
        setImageModal({
            isOpen: false,
            src: '',
            alt: '',
        });
    };

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
            img({ node, src, alt, ...props }: any) {
                return (
                    <img
                        src={src}
                        alt={alt}
                        {...props}
                        className={style.clickableImage}
                        onClick={() => handleImageClick(src || '', alt || '')}
                        style={{ cursor: 'pointer' }}
                    />
                );
            },
        }),
        [],
    );

    return (
        <>
            <ReactMarkdown
                className={[style.container, className].join(' ')}
                remarkPlugins={[remarkGfm]}
                components={components}
            >
                {children}
            </ReactMarkdown>

            <Popup
                showPopup={imageModal.isOpen}
                onCancel={handleCloseModal}
                onClear={handleCloseModal}
                showClear={true}
                showSubmit={false}
                showCancel={false}
                className={style.imageModal}
                classes={{
                    dataContainer: style.imageModalContent,
                    root: style.imageModalRoot,
                }}
            >
                <img
                    src={imageModal.src}
                    alt={imageModal.alt}
                    className={style.modalImage}
                />
            </Popup>
        </>
    );
});

MD.displayName = 'MD';
