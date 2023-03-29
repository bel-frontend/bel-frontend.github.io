import React, { useEffect } from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';

import { MD } from 'components';
import {
    updateArtickleRequest,
    createArtickleRequest,
    getArtickleByIdRequest,
    getArtickleSelector,
} from 'modules/artickles';

import { getCurrentUserSelector } from 'modules/auth';
import { USER_ROLES } from 'constants/users';

import 'react-markdown-editor-lite/lib/index.css';
import style from './style.module.scss';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const validationSchema = yup.object({
    title: yup.string().required(),
    description: yup.string(),
    dateArticle: yup.string().required(),
    author: yup.string().required(),
    tags: yup
        .string()
        .required('Поле абавязковае')
        .matches(/^[a-z0-9а-я'іў ]+$/i, 'Толькі літары, нумары і прабелы'),
    content: yup.string().required(),
});

const initialValues = {
    title: '',
    description: '',
    dateArticle: moment(new Date()).format('YYYY-MM-DD'),
    author: '',
    tags: '',
    content: '',
    isActive: false,
};

const Editor = ({
    history,
    match: {
        params: { id },
    },
    ...props
}: {
    history: any;
    match: { params: { id: number | string } };
}) => {
    const isAdd = id === 'add';
    const dispatch = useDispatch();
    const artickleData: any = useSelector(getArtickleSelector);
    const currentUser: any = useSelector(getCurrentUserSelector);

    React.useEffect(() => {
        if (id && !isAdd) {
            dispatch(getArtickleByIdRequest({ id }));
        }
    }, [id, isAdd]);

    const {
        values,
        touched,
        errors,
        setFieldValue,
        setValues,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues,
        onSubmit: (values) => {
            const tags = values.tags.trim().split(' ').filter(Boolean);

            if (isAdd) {
                dispatch(
                    createArtickleRequest(
                        { ...values, tags },
                        {
                            onSuccess: () => {
                                history.push('/');
                            },
                        },
                    ),
                );
            } else {
                dispatch(
                    updateArtickleRequest(
                        { id, ...values, tags },
                        {
                            onSuccess: () => {
                                history.push('/');
                            },
                        },
                    ),
                );
            }
        },
        validationSchema,
    });

    const { content = '', meta } = artickleData;

    useEffect(() => {
        if (id && !isAdd) {
            if (artickleData?.loaded) {
                setValues({
                    content: content,
                    description: meta?.description || '',
                    dateArticle: meta?.dateArticle || '',
                    author: meta?.author || '',
                    tags:
                        (Array.isArray(meta?.tags) && meta?.tags?.join(' ')) ||
                        (meta?.tags ?? ''),
                    isActive: meta?.isActive || false,
                    title: meta?.title || '',
                });
            }
        }
    }, [id, setValues, isAdd, artickleData]);

    return (
        <Box>
            <Box mb={1}>
                <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                >
                    Meтаданыя
                </label>
            </Box>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item md={12}>
                        <TextField
                            fullWidth
                            id="title"
                            name="title"
                            label="title*"
                            value={values.title}
                            size="small"
                            onChange={handleChange('title')}
                            error={touched.title && Boolean(errors.title)}
                            helperText={touched.title && errors.title}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <TextareaAutosize
                            id="description"
                            name="description"
                            minRows={2}
                            area-label="description"
                            placeholder="description"
                            value={values.description}
                            onChange={handleChange('description')}
                            className={style.textarea}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            fullWidth
                            id="author"
                            name="author"
                            label="author*"
                            value={values.author}
                            size="small"
                            onChange={handleChange('author')}
                            error={touched.author && Boolean(errors.author)}
                            helperText={touched.author && errors.author}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            fullWidth
                            id="tags"
                            name="tags"
                            label="tags*"
                            placeholder="Дадайце патрэбныя тэгі праз прабел: javascript webdev"
                            value={values.tags}
                            size="small"
                            onChange={handleChange('tags')}
                            error={touched.author && Boolean(errors.tags)}
                            helperText={touched.tags && errors.tags}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            fullWidth
                            id="dateArticle"
                            name="dateArticle"
                            label="date*"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={values.dateArticle}
                            size="small"
                            onChange={handleChange('dateArticle')}
                            error={
                                touched.dateArticle &&
                                Boolean(errors.dateArticle)
                            }
                            helperText={
                                touched.dateArticle && errors.dateArticle
                            }
                        />
                    </Grid>
                    <Grid item md={6}>
                        <FormControlLabel
                            control={
                                <Switch
                                    disabled={
                                        !meta?.isActive &&
                                        currentUser.role !==
                                            USER_ROLES.SUPERADMIN
                                    }
                                    checked={values.isActive}
                                    onChange={handleChange('isActive')}
                                />
                            }
                            label="Паказваць усім (можа актываваць толькі адмін)"
                        />
                    </Grid>
                </Grid>
                <Grid container className={style.container} spacing={3}>
                    <Grid item md={6} className={classnames('mb-3 mt-5')}>
                        <Box sx={{ position: 'sticky', top: '10vh' }}>
                            <Box m={1}>
                                <label
                                    htmlFor="exampleFormControlTextarea1"
                                    className="form-label"
                                >
                                    Рэдактар
                                </label>
                            </Box>
                            <MdEditor
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={({ text }) =>
                                    setFieldValue('content', text)
                                }
                                value={values.content}
                                placeholder={''}
                                style={{
                                    height: '60vh',
                                }}
                                view={{ menu: true, md: true, html: false }}
                                canView={{
                                    menu: true,
                                    md: true,
                                    html: false,
                                    fullScreen: true,
                                    both: false,
                                    hideMenu: false,
                                }}
                            ></MdEditor>
                            <Box mt={2}>
                                <Button
                                    sx={{ mr: 4 }}
                                    variant="outlined"
                                    className="mt-5"
                                    color="primary"
                                    onClick={() => history.goBack()}
                                >
                                    Скасаваць
                                </Button>

                                <Button
                                    disabled={
                                        !isAdd &&
                                        currentUser?.user_id !==
                                            artickleData?.meta?.user_id &&
                                        currentUser.role !==
                                            USER_ROLES.SUPERADMIN
                                    }
                                    variant="contained"
                                    className="mt-5"
                                    type="submit"
                                >
                                    Захаваць
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={6} className={classnames('mb-3 mt-5')}>
                        <Box m={1}>
                            <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                            >
                                Прадагляд
                            </label>
                        </Box>
                        <MD>{values.content}</MD>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default Editor;
