import * as React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { registerRequest } from 'modules/auth';

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
            registerRequest(
                email,
                password,
                (user) => {
                    history.push('/');
                },
                (error) => {
                    setErrors({ email: error.message });
                    console.log(error.message);
                },
            );
        },
    });

    return (
        <Grid container sx={{ mb: 0, mt: 30 }}>
            <Grid item md={4} xs={2}></Grid>
            <Grid item md={4} xs={8}>
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
                        {t('sign_up.confirm_button')}
                    </Button>
                </Box>
            </Grid>{' '}
            <Grid item md={4} xs={2}></Grid>
        </Grid>
    );
};

export default SignUp;
