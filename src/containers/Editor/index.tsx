'use client';
import React, { useRef, useEffect } from 'react';
import classnames from 'classnames';
import { debounce } from 'lodash';
import { useTranslation } from '@/modules/i18next';

import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';

import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { IconButton, Tooltip } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { useRouter } from 'next/navigation';

import { USER_ROLES } from '@/constants/users';
import { checkUserAccess } from '@/modules/auth';

import { MD, UploadFile } from '@/components';

import { useHooks } from './hooks';
import { UploadController } from './components/UploadController';
import { usePreviewWindow } from './usePreviewWindow';

import 'react-markdown-editor-lite/lib/index.css';
import style from './style.module.scss';
import { Save } from '@mui/icons-material';

const mdParser = new MarkdownIt({ typographer: true });

const Editor = ({ params: { id } }: { params: { id: number | string } }) => {
    const history = useRouter();
    const button = useRef<HTMLButtonElement>(null);
    const { t } = useTranslation();
    const {
        handleSubmit,
        values,
        touched,
        handleChange,
        errors,
        currentUser,
        artickleData,
        setFieldValue,
        isAdd,
        onImageUpload,
        urls,
        onDelete,
        onCancel,
        deleteArticle,
        saveUpdates,
        isValid,
    } = useHooks({ history, id });

    const [mode, setMode] = React.useState('0');
    const isAdmin = checkUserAccess(currentUser, [
        USER_ROLES.ADMIN,
        USER_ROLES.SUPERADMIN,
    ]);
    const [previewContent, setPreviewContent] = React.useState(values.content);

    // Preview window hook
    const { openPreviewWindow, isPreviewWindowOpen } = usePreviewWindow({
        previewContent,
        title: t('editor.preview_window_title'),
    });

    // Debounced update function
    const updatePreviewContent = React.useMemo(
        () =>
            debounce((content: string) => {
                setPreviewContent(content);
            }, 500),
        [],
    );

    useEffect(() => {
        updatePreviewContent(values.content);
        return () => {
            updatePreviewContent.cancel();
        };
    }, [values.content, updatePreviewContent]);

    const [autosave, setAutoSave] = React.useState(true);
    const [interval, setIntervalID] = React.useState<any>(null);

    // React.useEffect(() => {
    //     console.log('interval', interval);

    //     clearInterval(interval);
    //     if (autosave && !isAdd && isValid && !interval) {
    //         const intervalID = setInterval(() => {
    //             if (button.current) {
    //                 button.current.click();
    //             }
    //         }, 5000);
    //         setIntervalID(intervalID);
    //         return () => clearInterval(interval);
    //     } else if (!autosave) {
    //         clearInterval(interval);
    //     }
    // }, [autosave, isAdd, values, isValid]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                (event.ctrlKey && event.key === 's') ||
                (event.ctrlKey && event.key === 'ы')
            ) {
                event.preventDefault();
                if (button.current) {
                    button.current.click();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <Box>
            <Box mb={1}>
                <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                >
                    {t('editor.metadata_label')}
                </label>
            </Box>
            <form
                onSubmit={(ev) => {
                    console.log('submit');

                    handleSubmit(ev);
                }}
            >
                <Grid container spacing={4}>
                    <Grid item md={10}>
                        <TextField
                            fullWidth
                            id="title"
                            name="title"
                            label={t('editor.title_label')}
                            value={values.title}
                            size="small"
                            onChange={handleChange('title')}
                            error={touched.title && Boolean(errors.title)}
                            helperText={touched.title && errors.title}
                        />
                    </Grid>
                    <Grid item md={2}>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={deleteArticle}
                            disabled={isAdd}
                        >
                            {t('editor.delete_article')}
                        </Button>
                    </Grid>
                    <Grid item md={6}>
                        <TextareaAutosize
                            id="description"
                            name="description"
                            minRows={2}
                            area-label={t('editor.description_placeholder')}
                            placeholder={t('editor.description_placeholder')}
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
                            label={t('editor.author_label')}
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
                            label={t('editor.tags_label')}
                            placeholder={t('editor.tags_placeholder')}
                            value={values.tags}
                            size="small"
                            onChange={handleChange('tags')}
                            error={touched.author && Boolean(errors.tags)}
                            helperText={touched.tags && errors.tags?.toString()}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            fullWidth
                            id="dateArticle"
                            name="dateArticle"
                            label={t('editor.date_label')}
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
                    {isAdmin ? (
                        <Grid item md={12}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="lang-label">
                                    {t('editor.lang_label')}
                                </InputLabel>
                                <Select
                                    labelId="lang-label"
                                    id="lang"
                                    name="lang"
                                    value={values.lang}
                                    label={t('editor.lang_label')}
                                    onChange={(e) =>
                                        setFieldValue('lang', e.target.value)
                                    }
                                >
                                    <MenuItem value="be">
                                        {t('editor.lang_belarusian')}
                                    </MenuItem>
                                    <MenuItem value="en">
                                        {t('editor.lang_english')}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    ) : null}
                    <Grid item md={6}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={values.isActive}
                                    onChange={handleChange('isActive')}
                                />
                            }
                            label={t('editor.visibility_label')}
                        />
                        {isAdmin ? (
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={values.isPinned}
                                        onChange={handleChange('isPinned')}
                                    />
                                }
                                label={t('editor.pin_label')}
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
                    <Grid item md={6}>
                        <Box display="flex" gap={2} alignItems="center">
                            <ToggleButtonGroup
                                color="primary"
                                exclusive
                                value={mode}
                                onChange={(ev, value) => {
                                    setMode(value);
                                }}
                                aria-label="Platform"
                                size="small"
                            >
                                <ToggleButton value="0">
                                    {t('editor.mode_editor')}
                                </ToggleButton>
                                <ToggleButton value="1">
                                    {t('editor.mode_preview')}
                                </ToggleButton>
                                <ToggleButton value="2">
                                    {t('editor.mode_both')}
                                </ToggleButton>
                            </ToggleButtonGroup>
                            <Tooltip title={t('editor.open_preview_window')}>
                                <IconButton
                                    color="primary"
                                    onClick={openPreviewWindow}
                                    size="small"
                                    disabled={
                                        !previewContent || isPreviewWindowOpen
                                    }
                                >
                                    <OpenInNewIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        justifyContent={'flex-end'}
                        display={'flex'}
                        gap={8}
                    >
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={autosave}
                                    onChange={(ev) => {
                                        setAutoSave(ev.target.checked);
                                    }}
                                />
                            }
                            label={t('editor.autosave')}
                        />
                        <Tooltip title={t('editor.save_changes_tooltip')}>
                            <Button
                                variant="contained"
                                disabled={!isValid}
                                ref={button}
                                onClick={() => {
                                    saveUpdates();
                                }}
                            >
                                {t('editor.save_changes')}{' '}
                                {!isValid
                                    ? t('editor.fill_required_fields')
                                    : ''}
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Grid container className={style.container} spacing={3}>
                    <Grid
                        item
                        md={mode == 0 ? 12 : 6}
                        className={classnames('mb-3 mt-5')}
                    >
                        <Box sx={{ position: 'sticky', top: '10vh' }}>
                            <Box
                                m={1}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                {/* <label
                                    htmlFor="exampleFormControlTextarea1"
                                    className="form-label"
                                >
                                    Рэдактар
                                </label> */}
                            </Box>
                            {mode == 1 ? null : (
                                <>
                                    <MdEditor
                                        renderHTML={(text) =>
                                            mdParser.render(text)
                                        }
                                        onChange={({ text }) =>
                                            setFieldValue('content', text)
                                        }
                                        value={values.content}
                                        placeholder={''}
                                        style={{
                                            height: '60vh',
                                        }}
                                        view={{
                                            menu: true,
                                            md: true,
                                            html: false,
                                        }}
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
                                            onClick={onCancel}
                                        >
                                            {t('editor.cancel')}
                                        </Button>

                                        <Button
                                            disabled={
                                                !isAdd &&
                                                currentUser?.user_id !==
                                                    artickleData?.meta
                                                        ?.user_id &&
                                                currentUser.role !==
                                                    USER_ROLES.SUPERADMIN
                                            }
                                            variant="contained"
                                            className="mt-5"
                                            type="submit"
                                        >
                                            {t('editor.save_and_home')}
                                        </Button>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </Grid>
                    {mode != 0 ? (
                        <Grid
                            item
                            md={mode == 1 ? 12 : 6}
                            className={classnames('mb-3 mt-5')}
                        >
                            <Box
                                sx={{
                                    position: 'sticky',
                                    top: '10vh',
                                    marginLeft: 'auto',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Tooltip
                                    title={t('editor.save_changes_tooltip')}
                                >
                                    <IconButton
                                        color="secondary"
                                        size="large"
                                        disabled={!isValid}
                                        sx={{
                                            backgroundColor: 'white',
                                            position: 'fixed',
                                            left: 'calc(100svw - 78px)',
                                            top: 'calc(100svh - 200px)',
                                        }}
                                        onClick={saveUpdates}
                                    >
                                        <Save />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            {previewContent && <MD>{previewContent}</MD>}
                        </Grid>
                    ) : null}
                </Grid>
            </form>
        </Box>
    );
};

export default Editor;
