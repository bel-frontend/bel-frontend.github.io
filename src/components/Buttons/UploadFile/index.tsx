import React from 'react';

import Button from '@mui/material/Button';

export function UploadFile({
    onChange,
    disabled,
    maxCount = 4,
    count = 0,
}: {
    onChange: (data: any) => any;
    disabled?: boolean;
    maxCount?: number;
    count?: number;
}) {
    return (
        <>
            <Button
                variant="contained"
                color="primary"
                size="small"
                component="label"
                disabled={disabled || count >= maxCount}
            >
                Загрузіць малюнкі{' '}
                {!disabled && count >= maxCount
                    ? `(не болей за ${maxCount} выявы)`
                    : ''}
                <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={(event: any) => {
                        onChange(event.currentTarget.files[0]);
                    }}
                />
            </Button>
        </>
    );
}
