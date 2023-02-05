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
        return new Promise((resolve) => {
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val() || 0;
                resolve(data);
            });
        });
    };

    const saveLikesToDB = async (artickleId) => {
        const countOfLikes = await getCountOfLikes(artickleId);
        const newCount = countOfLikes + 1;
        await set(ref(database, `artickles/${artickleId}/likes`), newCount);
        return newCount;
    };

    const removeLikeFromDB = async (artickleId) => {
        const countOfLikes = await getCountOfLikes(artickleId);
        const newCount = countOfLikes - 1;
        await set(ref(database, `artickles/${artickleId}/likes`), newCount);
        return newCount;
    };

    const saveLikeToLocalStorage = (artickleId) => {
        const items = JSON.parse(localStorage.getItem("user_liked_item")) || [];
        localStorage.setItem(
            "user_liked_item",
            JSON.stringify([...items, artickleId])
        );
    };
    const removeLikeFromLocalStorage = (artickleId) => {
        const items = JSON.parse(localStorage.getItem("user_liked_item")) || [];
        localStorage.setItem(
            "user_liked_item",
            JSON.stringify([...items.filter((i) => i !== artickleId)])
        );
    };

    const checkArtickeIsLiked = (artickleId) => {
        const items = JSON.parse(localStorage.getItem("user_liked_item")) || [];
        return items.find((i) => i === artickleId);
    };

    const buttons = document.querySelectorAll(".like");

    const setLikesCountToCounter = () => {
        const likes_counter = document.querySelectorAll(".count_likes");
        likes_counter.forEach(async (item) => {
            const id = item.getAttribute("artickle_id");
            const count = await getCountOfLikes(id);
            item.textContent = count;
        });
    };

    setLikesCountToCounter();

    buttons.forEach((button) => {
        button.addEventListener("click", async (event) => {
            const id = event.target.closest(".like")
                ? event.target.closest(".like").getAttribute("artickle_id")
                : null;
            if (id) {
                if (checkArtickeIsLiked(id)) {
                    await removeLikeFromDB(id);
                    setLikesCountToCounter();
                    removeLikeFromLocalStorage(id);
                } else {
                    await saveLikesToDB(id);
                    setLikesCountToCounter();
                    saveLikeToLocalStorage(id);
                }
            }
        });
    });
});
