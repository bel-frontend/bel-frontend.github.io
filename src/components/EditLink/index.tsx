'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { USER_ROLES } from '@/constants/users';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { getCurrentUserSelector, currentUserIsAuth } from '@/modules/auth';
import { checkPermission } from '@/utils/permissions';

const EditLink = ({ meta, id }: { meta: { user_id: string }; id: string }) => {
    const currentUser: any = useSelector(getCurrentUserSelector);
    const userIsAuth = useSelector(currentUserIsAuth);
    const router = useRouter();

    return userIsAuth &&
        (checkPermission(currentUser, [
            USER_ROLES.ADMIN,
            USER_ROLES.SUPERADMIN,
        ]) ||
            currentUser?.user_id === meta?.user_id) ? (
        <Box>
            <IconButton
                onClick={() => {
                    router.push(`/editor/${id}`);
                }}
            >
                <EditIcon />
            </IconButton>
        </Box>
    ) : null;
};

export default EditLink;
