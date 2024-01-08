import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';

import {
    updateArtickleRequest,
    createArtickleRequest,
    getArtickleByIdRequest,
    getArtickleSelector,
    autoSaveArticle,
    clearAutoSaveArticle,
    getAutoSavedArtickleSelector,
    deleteArticleRequest,
    AutoSaveArticleInterface,
} from '@/modules/artickles';
import { showPopupAction, hidePopupAction } from '@/modules/popups';

import {
    uploadImageForArticleRequest,
    deleteImageRequest,
    getImagesRequest,
    getImagesSelector,
} from '@/modules/files';
import { ArticleInterface } from '@/modules/artickles/types/article';

import { getCurrentUserSelector } from '@/modules/auth';

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

interface FormDataValues {
    title: string;
    description: string;
    dateArticle: string;
    author: string;
    tags: string;
    content: string;
    isActive: boolean;
    isPinned: boolean;
}

const initialValues: FormDataValues = {
    title: '',
    description: '',
    dateArticle: moment(new Date()).format('YYYY-MM-DD'),
    author: '',
    tags: '',
    content: '',
    isActive: false,
    isPinned: false,
};

export const useHooks = ({ history, id }: { history: any; id: any }) => {
    const isAdd = id === 'add';
    const dispatch = useDispatch();
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
    }, [id, isAdd]);

    const autoSavedArticle = useSelector<any, AutoSaveArticleInterface>(
        getAutoSavedArtickleSelector,
    );
    const { content = '', meta } = artickleData;

    const autoSaveArtickleClone = { ...autoSavedArticle };

    delete autoSaveArtickleClone.updated_at; // disabled re-rendering

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
          };

    const initialWithAutosave = {
        ...formData,
        // ...(((autoSavedArticle?.id === id ||
        //     (isAdd && autoSaveArtickleClone.isAdd)) &&
        //     autoSavedArticle?.updated_at) ||
        // 0 > new Date(artickleData.updated_at || 0).getTime()
        //     ? autoSaveArtickleClone
        //     : {}),
    };

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
            ...initialWithAutosave,
        },
        enableReinitialize: true,
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
        validationSchema,
    });

    // React.useEffect(() => {
    //     if (isAdd || artickleData?.loaded) {
    //         dispatch(
    //             autoSaveArticle({
    //                 ...values,
    //                 isAdd,
    //                 id,
    //             }),
    //         );
    //     }
    // }, [values]);

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
        dispatch(clearAutoSaveArticle());
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

    const onCancel = () => {
        history.back();
        dispatch(clearAutoSaveArticle());
    };

    const deleteArticle = () => {
        dispatch(
            showPopupAction({
                title: '',
                subtitle: 'Гэты артыкул будзе выдалены назаўседы. Працягнуць?',
                type: 'confirm',
                submitButtonText: 'Выдаліць',
                cancelButtonText: 'Скасаваць',
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
        onCancel,
        deleteArticle,
    };
};
