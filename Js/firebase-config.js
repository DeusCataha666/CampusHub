// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCMYhnIGyQw4SyYHDHMcHiU-AGpCnjODEE",
    authDomain: "campushub-fff2f.firebaseapp.com", // Se agrega para soporte completo de Auth
    databaseURL: "https://campushub-fff2f-default-rtdb.firebaseio.com", // Necesario para Realtime Database (si lo usas)
    projectId: "campushub-fff2f",
    storageBucket: "campushub-fff2f.appspot.com", // Corregido para seguir las normas estándar del Bucket
    messagingSenderId: "889176728973",
    appId: "1:889176728973:web:2702866b4cc3387c8249c4",
    measurementId: "G-NRW41Y2JD8" // Útil si usas Analytics
};

// Inicializa Firebase
export const app = initializeApp(firebaseConfig);

// Inicializa Firebase Firestore
export const db = getFirestore(app);

// Inicializa Firebase Auth
export const auth = getAuth(app);
