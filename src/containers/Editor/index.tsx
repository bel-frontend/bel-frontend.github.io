import React from 'react';
import classnames from 'classnames';
import {
    TextField,
    TextareaAutosize,
    FormControlLabel,
    Switch,
    Box,
    Grid,
    Button,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';

import { MD } from 'components';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import { addArticleToDB, getArticlesByID } from 'modules/firebase';

import style from './style.module.scss';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const validationSchema = yup.object({
    title: yup.string().required(),
    description: yup.string(),
    dateArticle: yup.string().required(),
    author: yup.string().required(),
    tags: yup.string().required(),
    content: yup.string().required(),
});

const initialValues = {
    title: '',
    description: '',
    dateArticle: moment(new Date()).format('YYYY-MM-DD'),
    author: '',
    tags: '',
    content: '',
    isActive: true,
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
        validationSchema: validationSchema,
        onSubmit: ({ content, ...values }) => {
            if (isAdd) {
                addArticleToDB(content, Date.now().toString(), {
                    ...values,
                });
            } else {
                addArticleToDB(content, id, { ...values });
            }
            setTimeout(() => {
                history.push('/');
            }, 300);
        },
    });

    React.useEffect(() => {
        if (id && !isAdd) {
            getArticlesByID(id).then((data) => {
                if (data) {
                    const { article = '', meta } = data;
                    setValues({
                        content: article,
                        description: meta?.description || '',
                        dateArticle: meta?.dateArticle || '',
                        author: meta?.author || '',
                        tags: meta?.tags || '',
                        isActive: meta?.isActive || false,
                        title: meta?.title || '',
                    });
                }
            });
        }
    }, [id, setValues, isAdd]);

    return (
        <div>
            <Box height={'48px'}></Box>
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
                Meтададзеныя
            </label>
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
                        minRows={3}
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
                        id="author"
                        name="tags"
                        label="tags*"
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
                            touched.dateArticle && Boolean(errors.dateArticle)
                        }
                        helperText={touched.dateArticle && errors.dateArticle}
                    />
                </Grid>
                <Grid item md={3}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={values.isActive}
                                onChange={handleChange('isActive')}
                            />
                        }
                        label="Актываваць"
                    />
                </Grid>
            </Grid>
            <Grid container className={style.container} spacing={3}>
                <Grid item md={6} className={classnames('mb-3 mt-5')}>
                    <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label"
                    >
                        Рэдактар
                    </label>
                    <MdEditor
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={({ text }) => setFieldValue('content', text)}
                        value={values.content}
                        placeholder={''}
                        style={{ height: '80vh' }}
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
                        variant="contained"
                        className="mt-5"
                        onClick={() => handleSubmit()}
                    >
                        Захаваць
                    </Button>
                </Grid>
                <Grid item md={6} className={classnames('mb-3 mt-5')}>
                    <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label"
                    >
                        Прадагляд
                    </label>
                    <MD>{values.content}</MD>
                </Grid>
            </Grid>
        </div>
    );
};

export default Editor;
