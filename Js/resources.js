import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Manejo de autenticación
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('Usuario autenticado:', user.email);
    } else {
        window.location.href = '/login/login.html';
    }
});

setPersistence(auth, browserLocalPersistence)
    .then(() => console.log('La persistencia de sesión está configurada'))
    .catch((error) => console.error('Error configurando la persistencia:', error));

// Función para obtener la respuesta del chat y guardar en Firebase
const fetchChatResponse = async () => {
    const queryInput = document.getElementById('queryInput');
    const chatMessages = document.getElementById('chatMessages');

    if (!queryInput) {
        console.error('El elemento queryInput no existe en el DOM.');
        alert('Error interno: El campo de entrada no está disponible.');
        return;
    }

    const query = queryInput.value.trim();
    if (!query) {
        alert('Por favor, ingresa un término de búsqueda.');
        return;
    }

    const start = performance.now();

    try {
        const response = await fetch(`https://magicloops.dev/api/loop/a0f1f06d-de6c-474c-8ac7-1eb7ae84a880/run?query=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.statusText} (${response.status})`);
        }

        const data = await response.json();
        const end = performance.now();
        console.log(`Tiempo de respuesta API: ${end - start} ms`);

        chatMessages.innerHTML = ''; // Limpiar mensajes anteriores

        if (!data || !data.answer) {
            console.error('Datos inesperados de la API:', data);
            throw new Error('La API respondió con datos no válidos.');
        }

        const card = document.createElement('div');
        card.classList.add('card');
        // card.style.width = '100%'; // Ajustar el ancho de la tarjeta
        // card.style.height = '450px'; // Ajustar la altura de la tarjeta

        const title = document.createElement('h4');
        title.textContent = `Consulta: ${query}`;
        const responseText = document.createElement('p');
        responseText.textContent = `Respuesta: ${data.answer}`;

        card.appendChild(title);
        card.appendChild(responseText);
        chatMessages.appendChild(card);

        await addDoc(collection(db, "consultas"), {
            query: query,
            answer: data.answer,
            timestamp: new Date()
        });
        console.log("Consulta guardada correctamente en Firebase");
    } catch (error) {
        console.error('Error al obtener la respuesta de la API o al guardar en Firebase:', error);
        alert('Ocurrió un error procesando tu solicitud. Por favor, intenta nuevamente.');
    }
};

// Función para obtener todas las consultas desde Firebase
const fetchAllQueries = async () => {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) {
        console.error('El elemento chatMessages no existe en el DOM.');
        return;
    }
    chatMessages.innerHTML = ''; // Limpiar mensajes anteriores

    try {
        const querySnapshot = await getDocs(collection(db, "consultas"));

        if (!querySnapshot || querySnapshot.empty) {
            chatMessages.innerHTML = '<p>No hay consultas guardadas.</p>';
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();

            if (!data || !data.query || !data.answer) {
                console.error('Estructura de datos inesperada:', data);
                return;
            }

            const card = document.createElement('div');
            card.classList.add('card');

            const title = document.createElement('h5');
            title.textContent = `Consulta: ${data.query}`;
            const responseText = document.createElement('p');
            responseText.textContent = `Respuesta: ${data.answer}`;

            card.appendChild(title);
            card.appendChild(responseText);
            chatMessages.appendChild(card);
        });
    } catch (error) {
        console.error('Error al obtener las consultas de Firebase:', error);
        chatMessages.innerHTML = '<p>Ocurrió un error al recuperar las consultas.</p>';
    }
};

// Inicialización de eventos en el DOM
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const queryInput = document.getElementById('queryInput');
    const showQueriesButton = document.getElementById('showQueries');

    if (searchButton) {
        searchButton.addEventListener('click', fetchChatResponse);
    }

    if (queryInput) {
        queryInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                fetchChatResponse();
            }
        });
    }

    if (showQueriesButton) {
        showQueriesButton.addEventListener('click', fetchAllQueries);
    }
});

// Función para mostrar info-boxes con datos de la API
const fetchInfoBoxes = async (query) => {
    const infoBoxesContainer = document.querySelector('.info-boxes');
    infoBoxesContainer.innerHTML = ''; // Limpiar resultados anteriores

    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=AIzaSyD5p40hY1ml7gm6Oi3sQs0Qs4Ob7plhT-0`);
        const data = await response.json();


        if (data.items && Array.isArray(data.items)) {
            // Tomar solo los primeros 2 resultados
            const videos = data.items.slice(0, 2);

            videos.forEach(item => {
                if (item.id.kind === "youtube#video") {
                    const videoId = item.id.videoId;
                    const title = item.snippet.title;
                    const thumbnail = item.snippet.thumbnails.high.url;
                    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

                    // Crear el div de la info-box
                    const infoBox = document.createElement('div');
                    infoBox.classList.add('info-box');
                    infoBox.innerHTML = `
                        <img src="${thumbnail}" alt="${title}">
                        <h5>${title}</h5>
                        <a href="${videoUrl}" target="_blank">Ver en YouTube</a>
                    `;

                    infoBoxesContainer.appendChild(infoBox);
                }
            });
        } else {
            infoBoxesContainer.innerHTML = '<p>No se encontraron resultados.</p>';
        }
    } catch (error) {
        console.error('Error al obtener los temas:', error);
    }
};

const fetchResources = () => {
    const query = queryInput.value;
    fetch(`https://magicloops.dev/api/loop/a0f1f06d-de6c-474c-8ac7-1eb7ae84a880/run?query=${encodeURIComponent(query)}&key=AIzaSyAQDaDyf6uFwcYkvxUL9aZwouRUXnAjOX0`)
        .then(response => response.json())
        .then(data => {
            const infoBoxesContainer = document.querySelector('.info-boxes');
            infoBoxesContainer.innerHTML = ''; // Limpiar info-boxes anteriores

            data.results.forEach(resource => {
                const infoBox = document.createElement('div');
                infoBox.classList.add('info-box');

                if (resource.type === "video") {
                    // Si es un video, mostrar miniatura y enlace
                    const img = document.createElement('img');
                    img.src = resource.thumbnail; // URL de la miniatura
                    img.alt = resource.title;

                    const link = document.createElement('a');
                    link.href = resource.url; // Enlace al video en YouTube
                    link.target = "_blank";
                    link.textContent = "Ver en YouTube";

                    infoBox.appendChild(img);
                    infoBox.appendChild(link);
                } else if (resource.type === "article") {
                    // Si es un artículo, mostrar título y enlace
                    const title = document.createElement('h5');
                    title.textContent = resource.title;

                    const description = document.createElement('p');
                    description.textContent = resource.description;

                    const link = document.createElement('a');
                    link.href = resource.url;
                    link.target = "_blank";
                    link.textContent = "Siga leyendo";

                    infoBox.appendChild(title);
                    infoBox.appendChild(description);
                    infoBox.appendChild(link);
                }

                infoBoxesContainer.appendChild(infoBox);
            });
        })
        .catch(error => console.error('Error fetching resources:', error));
};

// Cargar temas predefinidos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    fetchInfoBoxes('university topics');

    const searchButton = document.getElementById('searchButton');
    const queryInput = document.getElementById('queryInput');

    searchButton.addEventListener('click', () => {
        fetchChatResponse();
        fetchInfoBoxes(queryInput.value);
    });

    queryInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            fetchChatResponse();
            fetchInfoBoxes(queryInput.value);
        }
    });
});

// Función para formatear enlaces en las respuestas del chat
const formatResponse = (text) => {
    const urls = {
        'Codecademy': 'https://www.codecademy.com',
        'freeCodeCamp': 'https://www.freecodecamp.org',
        'W3Schools': 'https://www.w3schools.com',
        'Coursera': 'https://www.coursera.org',
        'edX': 'https://www.edx.org'

    };

    let formattedText = text;
    for (const [name, url] of Object.entries(urls)) {
        const link = `<a href="${url}" style="color: blue;" target="_blank">${name}</a>`;
        formattedText = formattedText.replace(name, link);
    }
    return formattedText;
};

const menuButton = document.getElementById('menu-button');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const sidebarLinks = sidebar.querySelectorAll('a');
const closeSidebarButton = document.getElementById('close-sidebar');

function toggleSidebar() {
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
}

menuButton.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', toggleSidebar);
sidebarLinks.forEach(link => {
  link.addEventListener('click', toggleSidebar);
});

closeSidebarButton.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});