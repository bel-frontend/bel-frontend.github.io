'use client';
import React from 'react';
import classnames from 'classnames';
import { useInView } from 'react-intersection-observer';
import { LikeButton } from '@/components';
import { useTranslation } from '@/modules/i18next';
import style from './style.module.scss';

// Sticks to the bottom of the screen while the article is read and
// stops at the end of the article text, so it never floats over comments
export const ArticleLikeBar = ({
    articleId,
    likesCount,
}: {
    articleId: string;
    likesCount: number;
}) => {
    const { t } = useTranslation();
    // sentinel is visible only when the bar is at its place under the text
    const { ref, inView: isResting } = useInView();

    return (
        <>
            <div className={style.likeBar}>
                <div
                    className={classnames(style.likePill, {
                        [style.likePillResting]: isResting,
                    })}
                >
                    {isResting ? (
                        <span className={style.likeLabel}>
                            {t('article.like_question')}
                        </span>
                    ) : null}
                    <LikeButton
                        likesCount={likesCount}
                        articleId={articleId}
                        fetchLikeState
                    />
                </div>
            </div>
            <div ref={ref} className={style.likeSentinel} />
        </>
    );
};
