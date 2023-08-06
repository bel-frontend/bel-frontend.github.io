import React, { useEffect } from 'react';
import classnames from 'classnames';

import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';

import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import { USER_ROLES } from 'constants/users';

import { MD, UploadFile } from 'components';

import { useHooks } from './hooks';
import { UploadController } from './components/UploadController';

import 'react-markdown-editor-lite/lib/index.css';
import style from './style.module.scss';

const mdParser = new MarkdownIt({ typographer: true });

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
    const {
        handleSubmit,
        values,
        touched,
        handleChange,
        errors,
        meta,
        currentUser,
        artickleData,
        setFieldValue,
        isAdd,
        onImageUpload,
        urls,
        onDelete,
    } = useHooks({ history, id });

    console.log(currentUser);

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
                            label="Назва артыкула*"
                            value={values.title}
                            size="small"
                            onChange={handleChange('title')}
                            error={touched.title && Boolean(errors.title)}
                            helperText={touched.title && errors.title}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextareaAutosize
                            id="description"
                            name="description"
                            minRows={2}
                            area-label="Кароткае апісанне зместу"
                            placeholder="Кароткае апісанне зместу"
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
                            label="Імя аўтара (любы нікнэйм)*"
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
                            label="Тэгі для пошуку*"
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
                            label="Дата публікацыі артыкула*"
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
                                    checked={values.isActive}
                                    onChange={handleChange('isActive')}
                                />
                            }
                            label="Паказваць усім (артыкул будзе бачны для ўсіх карыстальнікаў)"
                        />
                        {currentUser.role === USER_ROLES.SUPERADMIN ? (
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={values.isPinned}
                                        onChange={handleChange('isPinned')}
                                    />
                                }
                                label="Замацаваць уверсе"
                            />
                        ) : null}
                    </Grid>
                    <Grid item md={6}>
                        <UploadController
                            urls={urls}
                            onDelete={({ filename, id }) => {
                                onDelete({ filename, id });
                            }}
                        />

                        <UploadFile
                            disabled={
                                artickleData.user_id !== currentUser.user_id &&
                                !isAdd
                            }
                            maxCount={8}
                            count={urls.length}
                            onChange={(data) => {
                                onImageUpload(data);
                            }}
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
