import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Inicio de sesión exitoso
            const user = userCredential.user;
            alert('Inicio de sesión exitoso');
            window.location.href = '/login/Resources/resources.html';
        })
        .catch((error) => {
            const alertBox = document.createElement('div');
            alertBox.textContent = `Error: revise el correo y la contraseña.`;
            alertBox.style.position = 'fixed';
            alertBox.style.top = '10px';
            alertBox.style.right = '10px';
            alertBox.style.backgroundColor = '#411306';
            alertBox.style.color = 'white';
            alertBox.style.padding = '10px';
            alertBox.style.borderRadius = '5px';
            document.body.appendChild(alertBox);

            setTimeout(() => {
                document.body.removeChild(alertBox);
            }, 1000);
        });
});