import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
    onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";

document.addEventListener("DOMContentLoaded", () => {
    // Import the functions you need from the SDKs you need

    const firebaseConfig = {
        apiKey: "AIzaSyCw3D0uzLYTCx7N8IQqP_v68le913Ha75U",
        authDomain: "bel-frontend.firebaseapp.com",
        databaseURL:
            "https://bel-frontend-default-rtdb.europe-west1.firebasedatabase.app",

        projectId: "bel-frontend",

        storageBucket: "bel-frontend.appspot.com",

        messagingSenderId: "47972660046",

        appId: "1:47972660046:web:436dd3287e01dbe442241f",

        measurementId: "G-4SWG2G965Q",
    };

    // Initialize Firebase

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const database = getDatabase(app);

    const getCountOfLikes = async (artickleId) => {
        const starCountRef = ref(database, `artickles/${artickleId}/likes`);
        return new Promise((resolvre) => {
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val() || 0;
                resolvre(data);
            });
        });
    };

    const saveLikesToDB = async (artickleId) => {
        const countOfLikes = await getCountOfLikes(artickleId);
        await set(
            ref(database, `artickles/${artickleId}/likes`),
            countOfLikes + 1
        );
    };
    const setUnlikesToDB = async (artickleId) => {
        const countOfLikes = await getCountOfLikes(artickleId);
        await set(
            ref(database, `artickles/${artickleId}/likes`),
            countOfLikes - 1
        );
    };

    const saveLikeToLocalStorage = (artickleId) => {
        const userId = `user_id_${parseInt(Math.random() * 10000)}`;
        const userIdFromLocalStorage =
            localStorage.getItem("user_like_data") || {};

        localStorage.setItem("user_like_data", {
            ...userIdFromLocalStorage,
        });
    };

    const buttons = document.querySelectorAll(".like");
    const showLikesCount = () => {
        const likes_counter = document.querySelectorAll(".count_likes");
        likes_counter.forEach(async (item) => {
            const id = item.getAttribute("artickle_id");
            const count = await getCountOfLikes(id);
            item.textContent = count;
        });
    };
    showLikesCount();

    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const id = event.target.getAttribute("artickle_id");
            saveLikesToDB(id);
            showLikesCount();
            saveLikeToLocalStorage(id);
        });
    });
});
