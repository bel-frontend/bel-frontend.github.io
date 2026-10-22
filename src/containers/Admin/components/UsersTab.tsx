'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';
import { useTranslation } from '@/modules/i18next';
import {
    AdminUser,
    banUserRequest,
    getAdminUsersRequest,
    getAdminUsersSelector,
    unbanUserRequest,
} from '@/modules/admin';

const PAGE_SIZE = 20;

const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleDateString('ru-RU') : '—';

const ROLE_COLORS: Record<string, 'default' | 'primary' | 'secondary'> = {
    SUPERADMIN: 'secondary',
    ADMIN: 'primary',
    USER: 'default',
};

export const UsersTab = ({
    currentUserId,
    currentUserRole,
}: {
    currentUserId?: string;
    currentUserRole?: string;
}) => {
    const { t }: { t: any } = useTranslation();
    const dispatch = useDispatch();
    const data: { users: AdminUser[]; total: number } | undefined = useSelector(
        getAdminUsersSelector,
    );
    const [search, setSearch] = React.useState('');
    const [page, setPage] = React.useState(0);
    const [banTarget, setBanTarget] = React.useState<AdminUser | null>(null);
    const [banReason, setBanReason] = React.useState('');

    const fetchUsers = React.useCallback(
        (searchValue: string, pageValue: number) => {
            dispatch(
                getAdminUsersRequest({
                    search: searchValue || undefined,
                    page: pageValue + 1,
                    pageSize: PAGE_SIZE,
                }),
            );
        },
        [dispatch],
    );

    const debouncedFetch = React.useMemo(
        () => debounce(fetchUsers, 400),
        [fetchUsers],
    );

    React.useEffect(() => {
        fetchUsers('', 0);
    }, [fetchUsers]);

    const refresh = () => fetchUsers(search, page);

    const confirmBan = () => {
        if (!banTarget) return;
        dispatch(
            banUserRequest(
                { user_id: banTarget.user_id, reason: banReason.trim() },
                { onSuccess: refresh },
            ),
        );
        setBanTarget(null);
        setBanReason('');
    };

    const users = data?.users || [];
    // same rules as on backend: nobody bans himself or superadmin,
    // only superadmin bans admins
    const canManage = (user: AdminUser) =>
        user.user_id !== currentUserId &&
        user.user_role !== 'SUPERADMIN' &&
        (user.user_role !== 'ADMIN' || currentUserRole === 'SUPERADMIN');

    return (
        <Box>
            <TextField
                size="small"
                placeholder={t('admin.users.search')}
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(0);
                    debouncedFetch(e.target.value, 0);
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                        </InputAdornment>
                    ),
                }}
                sx={{ mb: 2, width: { xs: '100%', sm: 320 } }}
            />
            <Box sx={{ overflowX: 'auto' }}>
                <Table size="small" sx={{ minWidth: 720 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('admin.users.email')}</TableCell>
                            <TableCell>{t('admin.users.role')}</TableCell>
                            <TableCell>{t('admin.users.created')}</TableCell>
                            <TableCell>{t('admin.users.last_login')}</TableCell>
                            <TableCell>{t('admin.users.status')}</TableCell>
                            <TableCell align="right" />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.user_id} hover>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        size="small"
                                        label={user.user_role}
                                        color={ROLE_COLORS[user.user_role]}
                                    />
                                </TableCell>
                                <TableCell>
                                    {formatDate(user.created)}
                                </TableCell>
                                <TableCell>
                                    {formatDate(user.last_login)}
                                </TableCell>
                                <TableCell>
                                    {user.banned ? (
                                        <Tooltip title={user.ban_reason || ''}>
                                            <Chip
                                                size="small"
                                                color="error"
                                                label={t('admin.users.banned')}
                                            />
                                        </Tooltip>
                                    ) : (
                                        <Chip
                                            size="small"
                                            variant="outlined"
                                            label={t('admin.users.active')}
                                        />
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {!canManage(user) ? null : user.banned ? (
                                        <Button
                                            size="small"
                                            onClick={() =>
                                                dispatch(
                                                    unbanUserRequest(
                                                        {
                                                            user_id:
                                                                user.user_id,
                                                        },
                                                        { onSuccess: refresh },
                                                    ),
                                                )
                                            }
                                        >
                                            {t('admin.users.unban')}
                                        </Button>
                                    ) : (
                                        <Button
                                            size="small"
                                            color="error"
                                            onClick={() => setBanTarget(user)}
                                        >
                                            {t('admin.users.ban')}
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        {!users.length ? (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        textAlign="center"
                                        py={2}
                                    >
                                        {t('admin.users.empty')}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : null}
                    </TableBody>
                </Table>
            </Box>
            <TablePagination
                component="div"
                count={data?.total || 0}
                page={page}
                rowsPerPage={PAGE_SIZE}
                rowsPerPageOptions={[PAGE_SIZE]}
                onPageChange={(_, nextPage) => {
                    setPage(nextPage);
                    fetchUsers(search, nextPage);
                }}
            />

            <Dialog
                open={Boolean(banTarget)}
                onClose={() => setBanTarget(null)}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    {t('admin.users.ban_title', { email: banTarget?.email })}
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                        {t('admin.users.ban_hint')}
                    </Typography>
                    <TextField
                        autoFocus
                        fullWidth
                        multiline
                        minRows={2}
                        label={t('admin.users.ban_reason')}
                        value={banReason}
                        inputProps={{ maxLength: 500 }}
                        onChange={(e) => setBanReason(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setBanTarget(null)}>
                        {t('admin.cancel')}
                    </Button>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={confirmBan}
                    >
                        {t('admin.users.ban')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
