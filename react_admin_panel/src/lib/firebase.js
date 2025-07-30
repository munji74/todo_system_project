// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAMtGp4M43wNzH74ysR3Z9q1BEIgFs4aW8",
    authDomain: "todo-app-project-decae.firebaseapp.com",
    projectId: "todo-app-project-decae",
    storageBucket: "todo-app-project-decae.firebasestorage.app",
    messagingSenderId: "134423978616",
    appId: "1:134423978616:web:e19d74802d9aeb552c438d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
