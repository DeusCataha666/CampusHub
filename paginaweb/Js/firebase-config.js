// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyCMYhnIGyQw4SyYHDHMcHiU-AGpCnjODEE",
    projectId: "campushub-fff2f",
    storageBucket: "campushub-fff2f.firebasestorage.app",
    messagingSenderId: "889176728973",
    appId: "1:889176728973:web:2702866b4cc3387c8249c4",
    measurementId: "G-NRW41Y2JD8"
};
    
// Inicializa Firebase
export const app = initializeApp(firebaseConfig);
//inicializa Firebase Firestore
export const db = getFirestore(app); 
// Inicializa Firebase Authentication
export const auth = getAuth(app);

 
