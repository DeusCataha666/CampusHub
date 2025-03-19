import { auth, db } from './firebase-config.js'; // Asegúrate de importar Firestore (db)
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto de recarga del formulario

    // Recoge los valores del formulario
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const nombre = document.getElementById('registerNombre').value;
    const apellidos = document.getElementById('registerApellidos').value;
    const nombreUsuario = document.getElementById('registerNombreUsuario').value;
    const carrera = document.getElementById('registerCarrera').value;

    try {
        // Registro del usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Guardar datos adicionales en Firestore
        await setDoc(doc(db, 'usuarios', user.uid), {
            nombre,
            apellidos,
            correoElectronico: email,
            nombreUsuario,
            carrera,
            fechaRegistro: new Date().toISOString() // Genera una marca de tiempo ISO
        });

        const alertBox = document.createElement('div');
        alertBox.textContent = '¡Registro Exitoso! Por favor, inicia sesión.';
        alertBox.style.position = 'fixed';
        alertBox.style.top = '10px';
        alertBox.style.right = '10px';
        alertBox.style.backgroundColor = 'green';
        alertBox.style.color = 'white';
        alertBox.style.padding = '10px';
        alertBox.style.borderRadius = '5px';
        document.body.appendChild(alertBox);

        setTimeout(() => {
            document.body.removeChild(alertBox);
        }, 1500);

        setTimeout(() => {
            window.location.href = '/login/login.html';
        }, 2000)
    } catch (error) {
        console.log(error.message);
        console.log(error.code);

        if (error.code === 'auth/email-already-in-use') {
            const alertBox = document.createElement('div');
            alertBox.textContent = '¡Error! El correo electrónico ya está en uso.';
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
            }, 1500);

        } else if (error.code === 'auth/weak-password') {
            const alertBox = document.createElement('div');
            alertBox.textContent = '¡Error! La contraseña debe tener al menos 6 caracteres.';
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
            }, 1500);

        } else if (error.code === 'auth/invalid-email') {
            const alertBox = document.createElement('div');
            alertBox.textContent = '¡Error! El correo electrónico no es válido.';
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
            }, 1500);

        }
    }
});
