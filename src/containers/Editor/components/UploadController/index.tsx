import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from '@/modules/i18next';

import { saveToClipBoard } from '@/helpers/clipboard';

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
    const { t } = useTranslation();

    return (
        <Box m={1}>
            <Box flexWrap="wrap">
                {urls.map((i: any) => {
                    return (
                        <Box key={i.filename} className={style.chip}>
                            <Tooltip
                                title={
                                    <>
                                        {t(
                                            'upload_controller.copy_url_tooltip',
                                        )}
                                        <Box p={1}>
                                            <img
                                                className={style.preview}
                                                src={i.url}
                                                alt={t(
                                                    'upload_controller.image_alt',
                                                )}
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
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};
