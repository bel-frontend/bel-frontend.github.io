import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import { useTranslation } from '@/modules/i18next';

import {
    updateArtickleRequest,
    createArtickleRequest,
    getArtickleByIdRequest,
    getArtickleSelector,
    clearAutoSaveArticle,
    deleteArticleRequest,
} from '@/modules/artickles';
import { showPopupAction, hidePopupAction } from '@/modules/popups';
import { showSuccess } from '@/modules/notification';
import {
    uploadImageForArticleRequest,
    deleteImageRequest,
    getImagesRequest,
    getImagesSelector,
} from '@/modules/files';
import { ArticleInterface } from '@/modules/artickles/types/article';

import { getCurrentUserSelector, authHashSelector } from '@/modules/auth';
import { DEFAULT_LANG } from '@/modules/i18next';
import { DATE_FORMAT_TO_SERVER } from '@/constants/date';
import {
    NEW_ARTICLE_ID,
    BC_SAVED_EVENT,
    getBroadcastChannelName,
    SYNC_POLL_INTERVAL_MS,
    OWN_SAVE_GRACE_MS,
} from './constants';

const validationSchema = (t: any) =>
    yup.object({
        title: yup.string().required(),
        description: yup.string(),
        dateArticle: yup.string().required(),
        author: yup.string().required(),
        tags: yup
            .string()
            .required(t('editor.validation_required'))
            .matches(/^[a-z0-9а-я'іў ]+$/i, t('editor.validation_chars_only')),
        content: yup.string().required(),
        lang: yup.string().required(t('editor.validation_lang_required')),
    });

interface FormDataValues {
    title: string;
    description: string;
    dateArticle: string;
    author: string;
    tags: string;
    content: string;
    isActive: boolean;
    isPinned: boolean;
    lang: string;
}

const initialValues: FormDataValues = {
    title: '',
    description: '',
    dateArticle: moment(new Date()).format(DATE_FORMAT_TO_SERVER),
    author: '',
    tags: '',
    content: '',
    isActive: false,
    isPinned: false,
    lang: DEFAULT_LANG,
};

export const useHooks = ({ history, id }: { history: any; id: any }) => {
    const isAdd = id === NEW_ARTICLE_ID;
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const artickleData = useSelector<any, ArticleInterface>(
        getArtickleSelector,
    );
    const currentUser: any = useSelector(getCurrentUserSelector);
    const images: any = useSelector(getImagesSelector);

    const [urls, setUrls] = React.useState<any[]>([]);

    React.useEffect(() => {
        if (images?.loaded) {
            setUrls(images);
        }
    }, [images]);

    React.useEffect(() => {
        if (id && !isAdd) {
            dispatch(getArtickleByIdRequest({ id }));
            dispatch(getImagesRequest({ artickle_id: id }));
        }
    }, [id, isAdd, dispatch]);

    const { content = '', meta } = artickleData;

    const formData: FormDataValues = isAdd
        ? initialValues
        : {
              content: content,
              description: meta?.description || '',
              dateArticle: meta?.dateArticle || '',
              author: meta?.author || '',
              tags: (Array.isArray(meta?.tags) && meta?.tags?.join(' ')) || '',
              isActive: meta?.isActive || false,
              isPinned: artickleData?.isPinned || false,
              title: meta?.title || '',
              lang: meta?.lang || artickleData?.lang || DEFAULT_LANG,
          };

    const initialWithAutosave = {
        ...formData,
        isAdd,
    };

    const {
        values,
        touched,
        errors,
        setFieldValue,
        setValues,
        handleChange,
        handleSubmit,
        isValid,
        dirty,
    } = useFormik({
        initialValues: {
            ...initialWithAutosave,
        },
        enableReinitialize: true,
        validationSchema: validationSchema(t),
        onSubmit: (values) => {
            const tags = values.tags.trim().split(' ').filter(Boolean);

            if (isAdd) {
                dispatch(
                    createArtickleRequest(
                        { ...values, tags, files: urls },
                        {
                            onSuccess: () => {
                                history.push('/');
                                history.refresh();
                            },
                        },
                    ),
                );
            } else {
                dispatch(
                    updateArtickleRequest(
                        { id, ...values, tags, files: urls },
                        {
                            onSuccess: () => {
                                history.push('/');
                                history.refresh();
                            },
                        },
                    ),
                );
            }
            dispatch(clearAutoSaveArticle());
        },
    });

    const authToken = useSelector<any, string>(authHashSelector);
    const lastKnownUpdatedAt = useRef<string | undefined>(undefined);
    const weJustSaved = useRef<number>(0);
    const dirtyRef = useRef(false);
    dirtyRef.current = dirty;
    const [conflictDetected, setConflictDetected] = React.useState(false);

    // Initialise the version reference when the article first loads
    useEffect(() => {
        if (artickleData?.updated_at && !lastKnownUpdatedAt.current) {
            lastKnownUpdatedAt.current = artickleData.updated_at;
        }
    }, [artickleData?.updated_at]);

    const saveUpdates = useCallback(() => {
        const tags = values.tags.trim().split(' ').filter(Boolean);

        if (isValid) {
            if (isAdd) {
                dispatch(
                    createArtickleRequest(
                        { ...values, tags, files: urls },
                        {
                            onSuccess: ({ data: { artickle_id } }: any) => {
                                history.push(`/editor/${artickle_id}  `);
                                dispatch(
                                    showSuccess({
                                        message: t('editor.article_saved'),
                                    }),
                                );
                            },
                        },
                    ),
                );
            } else {
                dispatch(
                    updateArtickleRequest(
                        { id, ...values, tags, files: urls },
                        {
                            onSuccess: ({ ...data }) => {
                                weJustSaved.current = Date.now();
                                setConflictDetected(false);
                                // Notify other tabs in the same browser
                                try {
                                    const bc = new BroadcastChannel(
                                        getBroadcastChannelName(id),
                                    );
                                    bc.postMessage({ type: BC_SAVED_EVENT });
                                    bc.close();
                                } catch {}
                                dispatch(
                                    showSuccess({
                                        message: t('editor.article_saved'),
                                    }),
                                );
                            },
                        },
                    ),
                );
            }
        }
    }, [values, urls, isValid, isAdd, dispatch, id, history, t]);

    // Detect saves from another tab in the same browser
    useEffect(() => {
        if (isAdd || !id) return;
        let channel: BroadcastChannel;
        try {
            channel = new BroadcastChannel(getBroadcastChannelName(id));
            channel.addEventListener('message', (event: MessageEvent) => {
                if (event.data?.type === BC_SAVED_EVENT) {
                    setConflictDetected(true);
                }
            });
        } catch {
            return;
        }
        return () => channel?.close();
    }, [id, isAdd]);

    // Sync with other devices (poll every 15 s)
    useEffect(() => {
        if (isAdd || !id || !authToken) return;

        const poll = () => {
            if (!lastKnownUpdatedAt.current) return;
            dispatch(
                getArtickleByIdRequest(
                    { id },
                    {
                        preventSuccess: true,
                        onSuccess: (response: any) => {
                            const data = response?.data;
                            if (!data?.updated_at) return;

                            const serverTime = new Date(
                                data.updated_at,
                            ).getTime();
                            const knownTime = new Date(
                                lastKnownUpdatedAt.current!,
                            ).getTime();

                            if (serverTime > knownTime) {
                                if (
                                    Date.now() - weJustSaved.current <
                                    OWN_SAVE_GRACE_MS
                                ) {
                                    // This was our own recent save — update the reference
                                    lastKnownUpdatedAt.current =
                                        data.updated_at;
                                } else if (!dirtyRef.current) {
                                    // No local edits — silently apply the server version
                                    setValues({
                                        title: data.meta?.title || '',
                                        description:
                                            data.meta?.description || '',
                                        dateArticle:
                                            data.meta?.dateArticle || '',
                                        author: data.meta?.author || '',
                                        tags: Array.isArray(data.meta?.tags)
                                            ? data.meta.tags.join(' ')
                                            : '',
                                        content: data.content || '',
                                        isActive: data.meta?.isActive || false,
                                        isPinned: data.isPinned || false,
                                        lang: data.meta?.lang || DEFAULT_LANG,
                                        isAdd,
                                    });
                                    lastKnownUpdatedAt.current =
                                        data.updated_at;
                                } else {
                                    // User has unsaved local changes — warn instead of overwriting
                                    setConflictDetected(true);
                                }
                            }
                        },
                    },
                ),
            );
        };

        const pollId = setInterval(poll, SYNC_POLL_INTERVAL_MS);
        return () => clearInterval(pollId);
    }, [id, isAdd, authToken, dispatch, setValues]);

    const dismissConflict = useCallback(() => {
        setConflictDetected(false);
        lastKnownUpdatedAt.current = new Date().toISOString();
    }, []);

    const loadServerVersion = useCallback(() => {
        dispatch(getArtickleByIdRequest({ id }));
        setConflictDetected(false);
        lastKnownUpdatedAt.current = new Date().toISOString();
    }, [dispatch, id]);

    const onImageUpload = useCallback(
        (files: File[]) => {
            files.forEach((file) => {
                const formData = new FormData();
                formData.append('image', file);
                formData.append('artickle_id', id);
                dispatch(
                    uploadImageForArticleRequest(
                        { data: formData },
                        {
                            onSuccess: (data: any) => {
                                setUrls((prevUrls) => [
                                    ...prevUrls,
                                    { ...data.data },
                                ]);
                            },
                        },
                    ),
                );
            });
        },
        [id, dispatch],
    );

    const onDelete = useCallback(
        ({ filename, id: field_id }: any) => {
            dispatch(clearAutoSaveArticle());

            // Для новых артыкулаў або калі няма id файла - проста выдаляем з лакальнага стану
            if (isAdd || !field_id) {
                setUrls((prevUrls) =>
                    prevUrls.filter((item) => item.filename !== filename),
                );
                return;
            }

            dispatch(
                deleteImageRequest(
                    { filename, id: field_id },
                    {
                        onSuccess: () => {
                            // Абнаўляем лакальны стан адразу
                            setUrls((prevUrls) =>
                                prevUrls.filter(
                                    (item) => item.filename !== filename,
                                ),
                            );
                            // Таксама перазапытваем з сервера для сінхранізацыі
                            dispatch(getImagesRequest({ artickle_id: id }));
                        },
                    },
                ),
            );
        },
        [dispatch, id, isAdd],
    );

    const onCancel = useCallback(() => {
        history.back();
        dispatch(clearAutoSaveArticle());
    }, [history, dispatch]);

    const deleteArticle = useCallback(() => {
        dispatch(
            showPopupAction({
                title: '',
                subtitle: t('editor.delete_confirm_subtitle'),
                type: 'confirm',
                submitButtonText: t('editor.delete_submit_button'),
                cancelButtonText: t('editor.delete_cancel_button'),
                onClick: () => {
                    dispatch(
                        deleteArticleRequest(
                            { id },
                            {
                                onSuccess: () => {
                                    dispatch(clearAutoSaveArticle());
                                    history.back();
                                    history.refresh();
                                },
                            },
                        ),
                    );
                    return true;
                },
                onCancel: () => {
                    dispatch(hidePopupAction());
                    return true;
                },
                confirmButtonProps: {
                    color: 'error',
                },
            }),
        );
    }, [dispatch, id, history, t]);

    return {
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
        conflictDetected,
        dismissConflict,
        loadServerVersion,
    };
};
