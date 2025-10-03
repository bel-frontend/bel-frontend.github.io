'use client';
import React from 'react';
import { MetaData } from '@/components/MetaData';
import { Box } from '@mui/material';
import { MD } from '@/components';
import { useTranslation } from '@/modules/i18next';

import { ArticleInterface } from '@/modules/artickles/types/article';
import EditLink from '@/components/EditLink';

import Link from 'next/link';
import Chip from '@mui/material/Chip';
import style from './style.module.scss';

export const EpisodePreview = ({ article }: { article: ArticleInterface }) => {
    const { meta, content, id, likes } = article;
    const url = id ? `/article/${id}` : '/';
    const { t } = useTranslation();

    return meta ? (
        <article className="episode box">
            <>
                <div className="article">
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <h2 className={style.episode__title}>
                            <Link
                                className={style.link}
                                href={meta ? url : '/'}
                            >
                                {meta?.title}
                            </Link>
                            {meta?.isPinned ? (
                                <Chip
                                    sx={{ ml: 2, mr: 2 }}
                                    label={t('home.pinned_label')}
                                />
                            ) : null}
                        </h2>
                        <EditLink meta={meta} id={id} />
                    </Box>
                    <div className="content">
                        <MD>{content}</MD>
                    </div>
                </div>
                <div className={style.alfa}></div>
                <MetaData
                    meta={{ ...meta }}
                    likes={likes}
                    articleId={id}
                    url={url}
                />
            </>
        </article>
    ) : null;
};
