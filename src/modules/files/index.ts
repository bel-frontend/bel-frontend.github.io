import * as api_helpers from 'react_redux_api';

const modules = 'files';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const apiRoutes = new ApiRoutes();

export const UPLOAD_IMAGE_REQUEST = `${modules}/UPLOAD_IMAGE_REQUEST`;
export const DELETE_IMAGE_REQUEST = `${modules}/DELETE_IMAGE_REQUEST`;
export const GET_IMAGES_REQUEST = `${modules}/GET_IMAGES_REQUEST`;

export const uploadImageForArticleRequest = actionCreator(UPLOAD_IMAGE_REQUEST);
export const deleteImageRequest = actionCreator(DELETE_IMAGE_REQUEST);
export const getImagesRequest = actionCreator(GET_IMAGES_REQUEST);

apiRoutes.add(UPLOAD_IMAGE_REQUEST, ({ data }: any = {}) => {
    console.log(data);

    return {
        url: `/upload_image`,
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data',
            // 'Content-Length': data?.size,
            // 'Content-Type': data?.type,
        },
    };
});
apiRoutes.add(DELETE_IMAGE_REQUEST, ({ filename, id }: any = {}) => {
    console.log(filename);

    return {
        url: `/delete_image`,
        method: 'delete',
        params: { filename, id },
    };
});

apiRoutes.add(GET_IMAGES_REQUEST, ({ artickle_id }: any = {}) => {
    return {
        url: `/get-articles-files/${artickle_id}`,
        method: 'get',
    };
});

export const getUrlOfUploadedImage = apiSelector(UPLOAD_IMAGE_REQUEST);
export const getImagesSelector = apiSelector(GET_IMAGES_REQUEST);
