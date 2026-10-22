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

let app;
let analytics;
let database;

if (typeof window !== 'undefined') {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    database = getDatabase(app);
}
