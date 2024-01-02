'use client';
import React from 'react';
import Link from 'next/link';
import { LikeButton, Tag } from '@/components';
import { Button, Box } from '@mui/material';
import { MetaDataInterface } from '@/constants/types/article';

import style from './style.module.scss';

export const MetaData = ({
    meta,
    showReadButton = true,
    url,
    articleId,
    likes,
    showTags = true,
}: {
    meta: MetaDataInterface;
    showReadButton?: boolean;
    url: string;
    articleId: string;
    likes: number;
    showTags?: boolean;
}) => {
    const { author = '', dateArticle = '' } = meta || {};

    return (
        <>
            <div className={style.episode_meta}>
                {showReadButton ? (
                    <Link href={url}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            disableElevation
                        >
                            Чытаць
                        </Button>
                    </Link>
                ) : null}
                {showReadButton ? (
                    <LikeButton likesCount={likes} articleId={articleId} />
                ) : null}
            </div>
            <div>
                {showTags &&
                    (meta?.tags.toString().split(',') || []).map(
                        (tag: string) => <Tag key={tag}>{tag}</Tag>,
                    )}
            </div>
            <Box marginTop={1}>
                <span className="author">{author}</span>,
                <span className="date-article"> {dateArticle}</span>
            </Box>
        </>
    );
};
