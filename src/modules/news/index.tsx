import * as api_helpers from 'react_redux_api';
import { useDispatch } from 'react-redux';
import React from 'react';
import { debounce } from 'lodash';

const modules = 'news';
const {
    helpers: { actionCreator, apiSelector },
    modules: { ApiRoutes },
} = api_helpers;

const apiRoutes = new ApiRoutes();

const GET_OPENAI_NEWS_REQUEST = `${modules}/GET_OPENAI_NEWS_REQUEST`;
const GET_GEMINI_NEWS_REQUEST = `${modules}/GET_GEMINI_NEWS_REQUEST`;

const getOpenAiNewsRequest = actionCreator(GET_OPENAI_NEWS_REQUEST);
const getGeminiNewsRequest = actionCreator(GET_GEMINI_NEWS_REQUEST);

apiRoutes.add(GET_OPENAI_NEWS_REQUEST, () => {
    return {
        url: `/get-rss-news`,
        method: 'get',
    };
});
apiRoutes.add(GET_GEMINI_NEWS_REQUEST, () => {
    return {
        url: `/get-rss-news-by-gemini`,
        method: 'get',
    };
});

export const useGetNews = () => {
    const dispatch = useDispatch();
    const [isLoadingOpenAiNews, setIsLoadingOpenAiNews] = React.useState(false);
    const [isLoadingGeminiNews, setIsLoadingGeminiNews] = React.useState(false);

    const getOpenAiNews = debounce(
        () =>
            new Promise((resolve, reject) => {
                setIsLoadingOpenAiNews(true);
                dispatch(
                    getOpenAiNewsRequest(null, {
                        onSuccess: (response: any) => {
                            resolve(response);
                            setIsLoadingOpenAiNews(false);
                        },
                        onFailure: (error: any) => {
                            reject(error);
                            setIsLoadingOpenAiNews(false);
                        },
                    }),
                );
            }),
        300,
    );

    const getGeminiNews = debounce(
        () =>
            new Promise((resolve, reject) => {
                setIsLoadingGeminiNews(true);
                dispatch(
                    getGeminiNewsRequest(null, {
                        onSuccess: (response: any) => {
                            setIsLoadingGeminiNews(false);
                            resolve(response);
                        },
                        onFailure: (error: any) => {
                            setIsLoadingGeminiNews(false);
                            reject(error);
                        },
                    }),
                );
            }),
        300,
    );

    return {
        getOpenAiNews,
        getGeminiNews,
        isLoadingOpenAiNews,
        isLoadingGeminiNews,
    };
};
