import React from 'react';
import { MetaData } from 'components/MetaData';
import { Link } from 'react-router-dom';
import { MD } from 'components';
import { useInView } from 'react-intersection-observer';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';

import { USER_ROLES } from 'constants/users';
import style from './style.module.scss';

export const EpisodePreview = ({
    meta,
    id,
    content,
    history,
    userIsAuth,
    isActive,
    likes = 0,
    currentUser,
}: any) => {
    const { ref, entry } = useInView({ threshold: 0 });
    const url = id ? `/article/${id}` : '/';
    const { user_id } = meta;
    const { role } = currentUser;

    return (
        <article className="episode box" ref={ref}>
            {entry?.isIntersecting && (
                <>
                    <div className="article">
                        <h2 className="episode__title">
                            <Link
                                className={
                                    userIsAuth && !isActive
                                        ? style.deactivatedLink
                                        : style.link
                                }
                                to={meta ? url : '/'}
                            >
                                {meta.title}
                            </Link>
                            {userIsAuth && !isActive ? (
                                <Chip sx={{ ml: 2, mr: 2 }} label="Выключана" />
                            ) : null}
                            {userIsAuth &&
                            (role === USER_ROLES.SUPERADMIN ||
                                user_id === currentUser?.user_id) ? (
                                <IconButton
                                    sx={{ ml: 1 }}
                                    color="secondary"
                                    onClick={() => {
                                        history.push(`/editor/${id}`);
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                            ) : null}
                        </h2>
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
            )}
        </article>
    );
};
