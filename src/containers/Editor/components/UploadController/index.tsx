import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import { saveToClipBoard } from 'helpers/clipboard';

import style from './style.module.scss';

export const UploadController = ({
    urls,
    onDelete,
    disabledDelete = false,
}: {
    disabledDelete?: boolean;
    urls: any[];
    onDelete: (data: any) => void;
}) => {
    const dispatch = useDispatch();

    return (
        <Box m={1}>
            <Stack direction="row" spacing={1}>
                {urls.map((i: any) => {
                    return (
                        <Tooltip
                            key={i.filename}
                            title={
                                <>
                                    Націсні каб скаріраваць URL
                                    <Box p={1}>
                                        <img
                                            className={style.preview}
                                            src={i.url}
                                        />
                                    </Box>
                                </>
                            }
                        >
                            <Chip
                                onClick={() => {
                                    saveToClipBoard(dispatch)(i.url);
                                }}
                                label={i.filename}
                                onDelete={
                                    disabledDelete
                                        ? undefined
                                        : () =>
                                              onDelete({
                                                  filename: i.filename,
                                                  id: i.id,
                                              })
                                }
                            />
                        </Tooltip>
                    );
                })}
            </Stack>
        </Box>
    );
};
