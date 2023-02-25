import React from 'react';
import classnames from 'classnames';
import EditorMD from 'for-editor';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { MD } from 'components';

// import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import { addArticleToDB, getArticlesByID } from 'modules/firebase';
import style from './style.module.scss';
import MarkdownIt from 'markdown-it';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const validationSchema = yup.object({
    title: yup.string().required(),
    dateArticle: yup.string().required(),
    author: yup.string().required(),
    tags: yup.string().required(),
    content: yup.string().required(),
});

const toolbarParams = {
    h1: true, // h1
    h2: true,
    h3: true,
    h4: true,
    link: true,
    code: true,
    preview: false,
    expand: true,
    undo: true,
    redo: true,
    save: false,
    subfield: false,
};

export const Editor = ({
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
        initialValues: {
            title: '',
            dateArticle: '',
            author: '',
            tags: '',
            content: '',
            isActive: true,
        },
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
                console.log(data);
                if (data) {
                    const { article = '', meta } = data;
                    setValues({
                        content: article,
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
            <Grid container spacing={3}>
                <Grid item md={12}>
                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        label="title"
                        value={values.title}
                        size="small"
                        onChange={handleChange('title')}
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                    />
                </Grid>
                <Grid item md={6}>
                    <TextField
                        fullWidth
                        id="author"
                        name="author"
                        label="author"
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
                        label="tags"
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
                        label="dateArticle"
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
