import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { registerRequest } from 'modules/auth';
import { useDispatch } from 'react-redux';

const validationSchema = (t: any) =>
    yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(6).max(16).required(),
        confirm_password: yup
            .string()
            .min(6)
            .max(16)
            .required()
            .oneOf([yup.ref('password'), ''], 'Passwords must match'),
    });

const SignUp = ({ history }: { history: any }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const {
        handleChange,
        handleBlur,
        touched,
        values,
        handleSubmit,
        errors,
        setErrors,
    } = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirm_password: '',
        },
        validationSchema: validationSchema(t),
        onSubmit: ({ email, password, ...values }) => {
            dispatch(
                registerRequest(
                    { email, password },
                    {
                        onSuccess: () => {
                            history.push('/');
                        },
                        onFailure: ({ response: { data: err } }: any) => {
                            console.error(err);
                            setErrors({ email: err });
                        },
                    },
                ),
            );
        },
    });

    return (
        <Box sx={{ mb: 0, mt: 30 }}>
            <Typography textAlign={'center'} variant="h4">
                Рэгістрацыя
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                minHeight={'70vh'}
            >
                <TextField
                    margin="dense"
                    required
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="email"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    helperText={touched.email ? errors.email : null}
                    error={touched.email && Boolean(errors.email)}
                />
                <TextField
                    margin="dense"
                    required
                    variant="outlined"
                    fullWidth
                    name="password"
                    label={'Пароль'}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                    helperText={touched.password ? errors.password : null}
                    error={touched.password && Boolean(errors.password)}
                />
                <TextField
                    margin="dense"
                    required
                    variant="outlined"
                    fullWidth
                    name="password"
                    label={'Паўтарыце пароль'}
                    type="password"
                    id="confirm_password"
                    autoComplete="current-password"
                    value={values.confirm_password}
                    onChange={handleChange('confirm_password')}
                    onBlur={handleBlur('confirm_password')}
                    helperText={
                        touched.confirm_password
                            ? errors.confirm_password
                            : null
                    }
                    error={
                        touched.confirm_password &&
                        Boolean(errors.confirm_password)
                    }
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1, mb: 1 }}
                >
                    Зарэгістравацца
                </Button>
            </Box>
        </Box>
    );
};

export default SignUp;
