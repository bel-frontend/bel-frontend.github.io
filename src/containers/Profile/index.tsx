'use client';
import * as React from 'react';
import Link from 'next/link';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FormControlLabel, Checkbox, FormGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from '@/modules/i18next';
import { Cell, GridGenerator, Card } from '@/components';
import {
    getMyArticklesSelector,
    getMyArticlesRequest,
    getUnactiveArticklesSelector,
    getUnactiveArticklesRequest,
} from '@/modules/artickles';
import { useViewport } from '@/modules/viewport';
import { getCurrentUserSelector } from '@/modules/auth';
import { MyArtickles } from './components/MyArtickles';
import { checkPermission } from '@/utils/permissions';
import { UserInterface } from '@/modules/auth/types/user';
import { USER_ROLES } from '@/constants/users';
import { ArticleInterface } from '@/modules/artickles/types/article';
import {
    addSubscribeRequest,
    deleteSubscribeRequest,
    getSubscribeRequest,
    getSubsribtionStatusSelector,
} from '@/modules/user';

import { useGetNews } from '@/modules/news';

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Profile({ history }: any) {
    const [value, setValue] = React.useState<string | number>(0);
    const { articles, total }: any = useSelector(getMyArticklesSelector);
    const currentUser: UserInterface = useSelector(getCurrentUserSelector);
    const { t } = useTranslation();

    const {
        getOpenAiNews,
        getGeminiNews,
        isLoadingGeminiNews,
        isLoadingOpenAiNews,
    } = useGetNews();

    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getMyArticlesRequest());
        dispatch(getSubscribeRequest());
    }, []);
    const { viewPort } = useViewport();
    const isMobile = viewPort?.isMobile;

    const { enabled: subscribeStatus = false } = useSelector<
        any,
        { enabled: boolean }
    >(getSubsribtionStatusSelector);
    console.log('subscribeStatus', subscribeStatus);

    const handleSubscribe = () => {
        if (subscribeStatus) {
            dispatch(
                deleteSubscribeRequest(
                    {},
                    {
                        onSuccess: () => {
                            dispatch(getSubscribeRequest());
                        },
                    },
                ),
            );
        } else {
            dispatch(
                addSubscribeRequest(
                    {},
                    {
                        onSuccess: () => {
                            dispatch(getSubscribeRequest());
                        },
                    },
                ),
            );
        }
    };

    const { preparedArticles, likes, articleWithMostLikes } =
        React.useMemo(() => {
            const articleWithMostLikes = articles?.reduce(
                (max: any, article: any) => {
                    return (max?.likes || 0) > (article?.likes || 0)
                        ? max
                        : article;
                },
                null,
            );

            return {
                preparedArticles: articles || [],
                likes: articles?.reduce((acc: any, article: any) => {
                    return acc + article?.likes;
                }, 0),
                articleWithMostLikes,
            };
        }, [articles]);

    const handleChange = (
        event: React.SyntheticEvent,
        newValue: string | number,
    ) => {
        setValue(newValue);
    };

    const isAdmin = checkPermission(currentUser, [
        USER_ROLES.ADMIN,
        USER_ROLES.SUPERADMIN,
    ]);

    React.useEffect(() => {
        if (isAdmin) {
            dispatch(getUnactiveArticklesRequest());
        }
    }, []);

    const { articles: unactiveArticles = [] } = useSelector<
        unknown,
        { articles: ArticleInterface[] }
    >(getUnactiveArticklesSelector);

    return (
        <Box
            sx={{
                minHeight: '80vh',
                width: '100%',
            }}
        >
            <GridGenerator
                style={{
                    minHeight: '100%',
                    // maxHeight: '100%',
                }}
                cols={isMobile ? 1 : 6}
                rows={isMobile ? 12 : 7}
                gap={[30, 30]}
            >
                <Cell col={0} row={0} colSpan={isMobile ? 1 : 2} rowSpan={1}>
                    <Card>
                        <Typography variant="subtitle1">
                            {t('profile.total_likes')}
                        </Typography>
                        <Typography>{likes}</Typography>
                    </Card>
                </Cell>
                <Cell
                    col={isMobile ? 0 : 2}
                    row={isMobile ? 1 : 0}
                    colSpan={isMobile ? 1 : 2}
                    rowSpan={1}
                >
                    <Card>
                        <Typography variant="subtitle1">
                            {t('profile.most_popular_article')}
                        </Typography>
                        <Typography>
                            <Link href={`/article/${articleWithMostLikes?.id}`}>
                                {articleWithMostLikes?.meta?.title ||
                                    t('profile.no_articles')}
                            </Link>
                        </Typography>
                    </Card>
                </Cell>
                <Cell
                    col={isMobile ? 0 : 4}
                    row={isMobile ? 2 : 0}
                    colSpan={isMobile ? 1 : 2}
                    rowSpan={1}
                >
                    <Card>
                        <FormControlLabel
                            checked={subscribeStatus}
                            control={
                                <Checkbox
                                    onChange={handleSubscribe}
                                    checked={subscribeStatus}
                                />
                            }
                            label={t('profile.subscribe_news')}
                        />
                        <Typography variant="body2">
                            {t('profile.subscribe_description')}
                        </Typography>
                        {isAdmin && (
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                                gap={'10px'}
                            >
                                <Button
                                    onClick={getOpenAiNews}
                                    disabled={isLoadingOpenAiNews}
                                >
                                    {isLoadingOpenAiNews
                                        ? t('profile.loading')
                                        : t('profile.send_openai_news')}
                                </Button>
                                <Button
                                    onClick={getGeminiNews}
                                    disabled={isLoadingGeminiNews}
                                >
                                    {isLoadingGeminiNews
                                        ? t('profile.loading')
                                        : t('profile.send_gemini_news')}
                                </Button>
                            </Box>
                        )}
                    </Card>
                </Cell>

                <Cell
                    col={0}
                    row={isMobile ? 3 : 1}
                    colSpan={isMobile ? 1 : 6}
                    rowSpan={6}
                >
                    <Card
                        sx={{
                            width: '100%',
                            height: '100%',
                            // overflowY: 'auto',
                            maxHeight: '100%',
                            maxWidth: 'calc(100vw - 32px) !important',
                        }}
                    >
                        {isAdmin ? (
                            <Box
                                sx={{
                                    paddingBottom: 2,
                                }}
                            >
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                    textColor="secondary"
                                    indicatorColor="secondary"
                                >
                                    <Tab
                                        label={t('profile.tab_my_articles')}
                                        {...a11yProps(0)}
                                    />
                                    <Tab
                                        label={t('profile.tab_all_drafts')}
                                        {...a11yProps(1)}
                                    />
                                </Tabs>
                            </Box>
                        ) : null}
                        <Box>
                            <Typography variant="h5">
                                {value === 1
                                    ? t('profile.drafts_all_authors')
                                    : t('profile.tab_my_articles')}
                            </Typography>
                            <MyArtickles
                                history={history}
                                articles={
                                    value === 1
                                        ? unactiveArticles
                                        : preparedArticles
                                }
                            />
                        </Box>
                    </Card>
                </Cell>
            </GridGenerator>
        </Box>
    );
}
