import React from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { sendErrorRequest } from 'modules/artickles';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

const validationSchema = () =>
    yup.object({
        message: yup
            .string()
            .min(6, 'Павінна быць не меней за 10 сівалаў')
            .required('Увядзіце тэкст'),
    });

export default function Error({ currentUser, artickleId }: any) {
    const dispatch = useDispatch();
    const { handleSubmit, values, handleChange, errors } = useFormik({
        onSubmit: ({ message }) => {
            dispatch(
                sendErrorRequest(
                    { message, artickleId },
                    {
                        onSuccess: () => {
                            setOpen(false);
                        },
                    },
                ),
            );
        },
        validationSchema: validationSchema(),
        initialValues: {
            message: '',
        },
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <Button variant="outlined" onClick={handleClickOpen}>
                Знайшлі памылку?
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Паведаміць пра памылку</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Паведамленне пра памылку будзе адпраўлена на Email да
                        аўтара артыкулу
                    </DialogContentText>
                    <TextField
                        value={values.message}
                        onChange={handleChange('message')}
                        autoFocus
                        margin="dense"
                        id="name"
                        label=""
                        placeholder="Калі ласка, апішыце памылку"
                        fullWidth
                        multiline
                        variant="standard"
                        helperText={errors.message}
                        error={Boolean(errors.message)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Адмяніць</Button>
                    <Box component={'form'} onSubmit={handleSubmit}>
                        <Button type="submit">Даслаць</Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
