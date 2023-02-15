import { getDatabase, ref, set, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: 'AIzaSyCw3D0uzLYTCx7N8IQqP_v68le913Ha75U',
    authDomain: 'bel-frontend.firebaseapp.com',
    databaseURL:
        'https://bel-frontend-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'bel-frontend',
    storageBucket: 'bel-frontend.appspot.com',
    messagingSenderId: '47972660046',
    appId: '1:47972660046:web:436dd3287e01dbe442241f',
    measurementId: 'G-4SWG2G965Q',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const database = getDatabase(app);

export const getCountOfLikes = async (artickleId: any): Promise<number> => {
    const starCountRef = ref(database, `artickles/${artickleId}/likes`);
    return new Promise((resolve) => {
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val() || 0;
            resolve(data);
        });
    });
};

export const saveLikesToDB = async (artickleId: any) => {
    const countOfLikes = await getCountOfLikes(artickleId);
    const newCount = countOfLikes + 1;
    await set(ref(database, `artickles/${artickleId}/likes`), newCount);
    return newCount;
};

export const removeLikeFromDB = async (artickleId: any) => {
    const countOfLikes = await getCountOfLikes(artickleId);
    const newCount = countOfLikes - 1;
    await set(ref(database, `artickles/${artickleId}/likes`), newCount);
    return newCount;
};

export const checkArtickeIsLiked = (artickleId: any) => {
    const items =
        JSON.parse(localStorage.getItem('user_liked_item') || '[]') || [];
    return items.find((i: any) => i === artickleId);
};

export const saveLikeToLocalStorage = (artickleId: any) => {
    const items =
        JSON.parse(localStorage.getItem('user_liked_item') || '[]') || [];
    localStorage.setItem(
        'user_liked_item',
        JSON.stringify([...items, artickleId]),
    );
};

export const removeLikeFromLocalStorage = (artickleId: any) => {
    const items =
        JSON.parse(localStorage.getItem('user_liked_item') || '[]') || [];
    localStorage.setItem(
        'user_liked_item',
        JSON.stringify([...items.filter((i: any) => i !== artickleId)]),
    );
};

export interface MetaData {
    number: string;
    title: string;
    dateArticle: string;
    author: string;
    chapters?: string;
    tags: string[] | string;
}

export const addArticleToDB = async (
    text: string,
    artickleId: any,
    meta: MetaData,
) => {
    await set(ref(database, `artickles/${artickleId}/article`), text);
    await set(ref(database, `artickles/${artickleId}/meta`), meta);
};

export const getArticlesFromDB = async (): Promise<any[]> => {
    const starCountRef = ref(database, `artickles`);
    return new Promise((resolve) => {
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val() || null;
            resolve(data);
        });
    });
};
