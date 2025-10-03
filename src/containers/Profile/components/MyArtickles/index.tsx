'use client';
import React from 'react';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArticleInterface } from '@/modules/artickles/types/article';

export const MyArtickles = ({ articles = [] }: any) => {
    const router = useRouter();
    const { t } = useTranslation();
    return (
        <Box sx={{ maxWidth: '100%', maxHeight: '100%', overflowY: 'auto' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                    {articles.map(
                        (
                            {
                                content,
                                meta,
                                id,
                                isActive,
                                likes,
                                title,
                            }: ArticleInterface,
                            index: number,
                        ) =>
                            meta ? (
                                <TableRow
                                    hover
                                    key={id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Link
                                            href={
                                                meta?.isActive
                                                    ? `/article/${id}`
                                                    : `/draft/${id}`
                                            }
                                        >
                                            {meta?.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">
                                        {meta?.isActive ? null : (
                                            <Chip
                                                label={t('profile.draft_chip')}
                                                color="warning"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            size="small"
                                            onClick={() => {
                                                router.push(`/editor/${id}`);
                                            }}
                                        >
                                            {t('profile.edit_button')}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ) : null,
                    )}
                </TableBody>
            </Table>
        </Box>
    );
};
