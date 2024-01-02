'use client';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: 'AIzaSyCw3D0uzLYTCx7N8IQqP_v68le913Ha75U',
    authDomain: 'bel-frontend.firebaseapp.com',
    projectId: 'bel-frontend',
    messagingSenderId: '47972660046',
    appId: '1:47972660046:web:8f3adf6f5c9c16e542241f',
    measurementId: 'G-REGR3FB1CP',
};
// Initialize Firebase

if (typeof window !== 'undefined') {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const database = getDatabase(app);
}

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
