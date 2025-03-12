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

        alert('Registro exitoso');
        window.location.href = 'login.html'; // Redirige al usuario después de registrarlo
    } catch (error) {
        console.log(error.message);
        console.log(error.code);

        if (error.code === 'auth/email-already-in-use') {
            alert('El correo electrónico ya está en uso');
        } else if (error.code === 'auth/weak-password') {
            alert('La contraseña es muy débil');
        } else if (error.code === 'auth/invalid-email') {
            alert('El correo electrónico no es válido');
        }
    }
});
