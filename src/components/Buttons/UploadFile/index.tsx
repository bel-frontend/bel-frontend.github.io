import React from 'react';

import Button from '@mui/material/Button';
export function UploadFile({ onChange }: { onChange: (data: any) => any }) {
    return (
        <>
            <Button
                variant="contained"
                color="primary"
                size="small"
                component="label"
            >
                Загрузіць малюнкі
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
