import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import showNotification from 'modules/notification';

import {
    updateArtickleRequest,
    createArtickleRequest,
    getArtickleByIdRequest,
    getArtickleSelector,
} from 'modules/artickles';

import {
    uploadImageForArticleRequest,
    deleteImageRequest,
    getImagesRequest,
    getImagesSelector,
} from 'modules/files';

import { getCurrentUserSelector } from 'modules/auth';

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
    isPinned: false,
};

let interval: any;

export const useHooks = ({ history, id }: { history: any; id: any }) => {
    const isAdd = id === 'add';
    const dispatch = useDispatch();
    const artickleData: any = useSelector(getArtickleSelector);
    const currentUser: any = useSelector(getCurrentUserSelector);
    const images: any = useSelector(getImagesSelector);
    const [autoSave, enableAutoSave] = React.useState(true);

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
                        { ...values, tags, files: urls },
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
                        { id, ...values, tags, files: urls },
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

    // React.useEffect(() => {
    //     if (autoSave) {
    //         interval = setInterval(() => {
    //             const tags = values.tags.trim().split(' ').filter(Boolean);
    //             if (isAdd) {
    //                 dispatch(
    //                     createArtickleRequest(
    //                         { ...values, tags, files: urls },
    //                         {
    //                             onSuccess: () => {},
    //                         },
    //                     ),
    //                 );
    //             } else {
    //                 dispatch(
    //                     updateArtickleRequest(
    //                         { id, ...values, tags, files: urls },
    //                         {
    //                             onSuccess: () => {},
    //                         },
    //                     ),
    //                 );
    //             }
    //         }, 5000);
    //     } else {
    //         clearInterval(interval);
    //     }
    // }, [autoSave]);

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
                    isPinned: artickleData?.isPinned || false,
                    title: meta?.title || '',
                });
            }
        }
    }, [id, setValues, isAdd, artickleData]);

    const onImageUpload = (data: any) => {
        const formData = new FormData();
        formData.append('image', data);
        formData.append('artickle_id', id);
        dispatch(
            uploadImageForArticleRequest(
                { data: formData },
                {
                    onSuccess: (data: any) => {
                        setUrls([...urls, { ...data.data }]);
                    },
                },
            ),
        );
    };

    const onDelete = ({ filename, id: field_id }: any) => {
        dispatch(
            deleteImageRequest(
                { filename, id: field_id },
                {
                    onSuccess: () => {
                        dispatch(getImagesRequest({ artickle_id: id }));
                    },
                },
            ),
        );
    };

    return {
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
    };
};
