'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { Card } from '@/components';
import { getCurrentUserSelector } from '@/modules/auth';
import { useTranslation } from '@/modules/i18next';
import { checkPermission } from '@/utils/permissions';
import { USER_ROLES } from '@/constants/users';
import { UsersTab } from './components/UsersTab';
import { ModerationTab } from './components/ModerationTab';

export default function Admin() {
    const { t } = useTranslation();
    const router = useRouter();
    const currentUser: any = useSelector(getCurrentUserSelector);
    const [tab, setTab] = React.useState(0);
    const isLoaded = Boolean(currentUser?.user_id);
    const isAdmin = checkPermission(currentUser, [
        USER_ROLES.ADMIN,
        USER_ROLES.SUPERADMIN,
    ]);

    // backend checks role too, this only hides the page from non-admins
    React.useEffect(() => {
        if (isLoaded && !isAdmin) router.replace('/');
    }, [isLoaded, isAdmin, router]);

    if (!isAdmin) return null;

    return (
        <Box>
            <Typography variant="h3" component="h1" fontWeight={700} mb={2}>
                {t('admin.title')}
            </Typography>
            <Card sx={{ height: 'auto', maxWidth: 'calc(100vw - 32px)' }}>
                <Tabs
                    value={tab}
                    onChange={(_, value) => setTab(value)}
                    textColor="secondary"
                    indicatorColor="secondary"
                    sx={{ mb: 2 }}
                >
                    <Tab label={t('admin.tabs.users')} />
                    <Tab label={t('admin.tabs.moderation')} />
                </Tabs>
                {tab === 0 ? (
                    <UsersTab
                        currentUserId={currentUser?.user_id}
                        currentUserRole={currentUser?.role}
                    />
                ) : (
                    <ModerationTab />
                )}
            </Card>
        </Box>
    );
}
