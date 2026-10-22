'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setLikedRequest,
    removeLikeRequest,
    getLikeRequest,
} from '@/modules/artickles';
import { currentUserIsAuth } from '@/modules/auth';
import { useTranslation } from '@/modules/i18next';
import { Button, Tooltip } from '@mui/material';
import HeardIcon from './components/HeardIcon';

import style from './style.module.scss';

interface LikeState {
    count: number;
    liked: boolean;
}

export const LikeButton = ({
    articleId,
    likesCount,
    className = '',
    fetchLikeState = false,
}: {
    articleId: string;
    likesCount: number;
    className?: string;
    // load current user's like from server (one request per button,
    // so it is enabled on the article page only, not in lists)
    fetchLikeState?: boolean;
}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const isAuthInStore = useSelector(currentUserIsAuth);
    // auth is restored from localStorage, unknown during SSR
    const [isMounted, setIsMounted] = React.useState(false);
    React.useEffect(() => setIsMounted(true), []);
    const userIsAuth = isMounted && Boolean(isAuthInStore);

    const [state, setState] = React.useState<LikeState>({
        count: likesCount,
        liked: false,
    });

    React.useEffect(() => {
        setState((prev) => ({ ...prev, count: likesCount }));
    }, [likesCount]);

    // refetch on login/logout: like state depends on user
    React.useEffect(() => {
        if (!fetchLikeState || !articleId) return;
        dispatch(
            getLikeRequest(
                { id: articleId },
                {
                    onSuccess: ({ data }: { data: LikeState }) => {
                        setState({
                            count: data?.count ?? 0,
                            liked: Boolean(data?.liked),
                        });
                    },
                },
            ),
        );
    }, [dispatch, articleId, fetchLikeState, isAuthInStore]);

    const onClick = () => {
        if (!userIsAuth) return;
        const prev = state;
        const liked = !prev.liked;
        // optimistic update, rolled back on failure
        setState({ liked, count: prev.count + (liked ? 1 : -1) });
        const request = liked ? setLikedRequest : removeLikeRequest;
        dispatch(
            request(
                { id: articleId },
                {
                    onSuccess: ({ data }: { data: LikeState }) => {
                        setState({
                            count: data?.count ?? 0,
                            liked: Boolean(data?.liked),
                        });
                    },
                    onFailure: () => setState(prev),
                },
            ),
        );
    };

    const button = (
        <Button
            color="error"
            type="button"
            variant={state.liked ? 'contained' : 'text'}
            size="small"
            onClick={onClick}
            aria-pressed={state.liked}
            disableElevation
            className={className}
        >
            <HeardIcon fill={state.liked ? 'white' : '#dc3d62'} />
            <span className={style.count_likes}>{state.count}</span>
        </Button>
    );

    return (
        <Tooltip
            title={
                userIsAuth
                    ? t('article.like_tooltip')
                    : t('article.like_login_required')
            }
        >
            {button}
        </Tooltip>
    );
};
