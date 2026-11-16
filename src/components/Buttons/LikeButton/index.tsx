'use client';

import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import {
    setLikedRequest,
    removeLikeRequest,
    getLikeRequest,
} from '@/modules/artickles';
import { useTranslation } from '@/modules/i18next';
import {
    Button,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogActions,
} from '@mui/material';
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
    const [showLogin, setShowLogin] = React.useState(false);
    const [isPending, setIsPending] = React.useState(false);
    const pendingRef = React.useRef(false);
    const { t } = useTranslation();
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
    }, [dispatch, articleId, fetchLikeState]);

    const onClick = () => {
        if (!userIsAuth) {
            setShowLogin(true);
            return;
        }
        if (pendingRef.current) return;
        pendingRef.current = true;
        setIsPending(true);
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
                        pendingRef.current = false;
                        setIsPending(false);
                        setState({
                            count: data?.count ?? 0,
                            liked: Boolean(data?.liked),
                        });
                    },
                    onFailure: () => {
                        pendingRef.current = false;
                        setIsPending(false);
                        setState(prev);
                    },
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
            aria-label={t('article.like_tooltip')}
            aria-busy={isPending}
            disabled={isPending}
            disableElevation
            className={className}
        >
            <HeardIcon fill={state.liked ? 'white' : '#dc3d62'} />
            <span className={style.count_likes}>{state.count}</span>
        </Button>
    );

    return (
        <>
            <Tooltip
                title={
                    userIsAuth
                        ? t('article.like_tooltip')
                        : t('article.like_login_required')
                }
            >
                {button}
            </Tooltip>
            <Dialog
                open={showLogin}
                onClose={() => setShowLogin(false)}
                aria-labelledby="like-login-title"
            >
                <DialogTitle id="like-login-title">
                    {t('article.like_login_required')}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setShowLogin(false)}>
                        {t('article.comments.cancel')}
                    </Button>
                    <Button component={Link} href="/login">
                        {t('header.menu.login')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
