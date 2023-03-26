import React from 'react';
import { EpisodePreview } from 'containers/Home/components/EpisodePreview';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';

import { getArticklesRequest, getArticklesSelector } from 'modules/artickles';
import { getCurrentUserSelector } from 'modules/auth';

export const MyArtickles = ({ history }: any) => {
    const dispatch = useDispatch();
    const currentUser: any = useSelector(getCurrentUserSelector);
    const { articles }: any = useSelector(getArticklesSelector);

    const preparedArticles = React.useMemo(() => {
        return articles || [];
    }, [articles]);

    React.useEffect(() => {
        if (currentUser?.user_id) {
            dispatch(getArticklesRequest({ user_id: currentUser?.user_id }));
        }
    }, [currentUser]);

    return (
        <Box sx={{ maxWidth: '100%' }}>
            {preparedArticles.map(
                (
                    {
                        content,
                        meta,
                        id,
                        isActive,
                        likes,
                    }: {
                        content: string;
                        meta: any;
                        id: any;
                        isActive: boolean;
                        likes: any;
                    },
                    index: number,
                ) =>
                    meta ? (
                        <EpisodePreview
                            currentUser={currentUser}
                            history={history}
                            key={index}
                            userIsAuth={true}
                            content={content}
                            meta={meta}
                            id={id}
                            isActive={isActive}
                            likes={likes}
                        />
                    ) : null,
            )}
        </Box>
    );
};
