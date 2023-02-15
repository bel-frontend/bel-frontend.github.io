import React from 'react';
import classnames from 'classnames';
import EditorMD from 'for-editor';
import get from 'lodash/get';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { MD } from 'components';
import TextField from '@mui/material/TextField';

import { addArticleToDB, getArticlesFromDB, MetaData } from 'modules/firebase';

import style from './style.module.scss';

const validationSchema = yup.object({
    number: yup.string().required(),
    title: yup.string().required(),
    dateArticle: yup.string().required(),
    author: yup.string().required(),
    chapter: yup.string().required(),
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
    const [articles, setArticles] = React.useState<any>([]);

    const {
        values,
        touched,
        errors,
        setFieldValue,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues: {
            number: '',
            title: '',
            dateArticle: '',
            author: '',
            chapter: '',
            tags: '',
            content: '',
        },
        validationSchema: validationSchema,
        onSubmit: ({ content, ...values }) => {
            if (id === 'add') {
                addArticleToDB(content, articles.length + 1, { ...values });
            } else {
                addArticleToDB(content, id, { ...values });
            }
            history.push('/');
            console.log(values);
        },
    });

    React.useEffect(() => {
        getArticlesFromDB().then((data) => {
            setArticles(data);
            if (get(data, `[${id}]`)) {
                setFieldValue(
                    'content',
                    get(data, `[${id}]`, { article: '' })?.article || '',
                );
            }
        });
    }, []);

    //     interface MetaData {
    //        number: number;
    //        title: string;
    //        dateArticle: string;
    //        author: string;
    //        chapters?: number;
    //        tags: string[] | string;
    //    }
    const onClick = () => {};

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
                        id="number"
                        name="number"
                        label="number"
                        type={'number'}
                        value={values.number}
                        size="small"
                        onChange={handleChange('number')}
                        error={touched.number && Boolean(errors.number)}
                        helperText={touched.number && errors.number}
                    />
                </Grid>
                <Grid item md={6}>
                    <TextField
                        fullWidth
                        id="dateArticle"
                        name="dateArticle"
                        label="dateArticle"
                        type="date"
                        value={values.dateArticle}
                        size="small"
                        onChange={handleChange('dateArticle')}
                        error={
                            touched.dateArticle && Boolean(errors.dateArticle)
                        }
                        helperText={touched.dateArticle && errors.dateArticle}
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
            </Grid>
            <Grid container className={style.container} spacing={3}>
                <Grid item md={6} className={classnames('mb-3 mt-5')}>
                    <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label"
                    >
                        Рэдактар
                    </label>
                    <EditorMD
                        onChange={(value) => setFieldValue('content', value)}
                        value={values.content}
                        placeholder={''}
                        toolbar={toolbarParams}
                        language={'en'}
                        height={'60vh'}
                    ></EditorMD>
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
