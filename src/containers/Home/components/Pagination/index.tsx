'use client';
import React from 'react';
import PaginationDFT from '@mui/material/Pagination';
import { Box } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';

const Pagination = ({ total, size }: { total: number; size: number }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const defaultPage = searchParams.get('page');

    const onChange = (ev: any, value: number) => {
        const params = new URLSearchParams({
            page: value.toString(),
            size: size.toString(),
        });
        const search = params.toString();
        router.push(pathname + '?' + search);
    };

    return (
        <Box display={'flex'} justifyContent={'center'}>
            <PaginationDFT
                count={Math.ceil(total / size)}
                shape="rounded"
                defaultPage={defaultPage ? Number(defaultPage) : 1}
                color="primary"
                onChange={onChange}
            />
        </Box>
    );
};

export default Pagination;
