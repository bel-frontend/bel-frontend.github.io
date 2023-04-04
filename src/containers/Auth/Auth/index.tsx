import * as React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { loginRequest } from 'modules/auth';

const validationSchema = (t: any) =>
    yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(6).max(16).required(),
    });

const Auth = ({ history }: { history: any }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { handleChange, values, handleSubmit, setErrors, errors } = useFormik(
        {
            initialValues: {
                email: '',
                password: '',
            },
            validationSchema: validationSchema(t),
            onSubmit: ({ email, password }) => {
                dispatch(
                    loginRequest(
                        { email, password },
                        {
                            onSuccess: () => {
                                history.goBack();
                            },
                            onFailure: ({ response: { data: err } }: any) => {
                                setErrors({ email: err });
                            },
                        },
                    ),
                );
            },
        },
    );

    return (
        <Box sx={{ mb: 0, mt: 30 }}>
            <Typography textAlign={'center'} variant="h4">
                Аўтарызацыя
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    margin="dense"
                    required
                    variant="outlined"
                    fullWidth
                    id="email"
                    label={'email'}
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange('email')}
                    autoFocus
                    helperText={errors.email}
                    error={Boolean(errors.email)}
                />
                <TextField
                    required
                    variant="outlined"
                    fullWidth
                    name="password"
                    label={'пароль'}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange('password')}
                    helperText={errors.password}
                    error={Boolean(errors.password)}
                    margin="dense"
                />
                <Box mt={2} mb={2}>
                    <Link to="/register"> Перайсці да рэгістрацыі</Link>
                </Box>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1, mb: 1 }}
                >
                    Увайсці
                </Button>
            </Box>
        </Box>
    );
};

export default Auth;
