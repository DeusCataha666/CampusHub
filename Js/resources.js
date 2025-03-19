import { auth } from './firebase-config.js';
import { onAuthStateChanged, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Manejo de autenticación
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('Usuario autenticado:', user.email);
    } else {
        window.location.href = 'login.html';
    }
});

setPersistence(auth, browserLocalPersistence)
    .then(() => console.log('La persistencia de sesión está configurada'))
    .catch((error) => console.error('Error configurando la persistencia:', error));

// Función para manejar la API de respuestas en el chat
const fetchChatResponse = async () => {
    const queryInput = document.getElementById('queryInput');
    const chatMessages = document.getElementById('chatMessages');
    const query = queryInput.value.trim();

    if (!query) return alert('Por favor, ingresa un término de búsqueda.');

    try {
        const response = await fetch(`https://magicloops.dev/api/loop/a0f1f06d-de6c-474c-8ac7-1eb7ae84a880/run?query=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (!data || !data.answer) {
            console.error('Datos inesperados de la API:', data);
            throw new Error('Respuesta no válida de la API');
        }

        const title = document.createElement('h3');
        title.textContent = 'Respuesta:';
        
        const content = document.createElement('p');
        content.innerHTML = formatResponse(data.answer);

        chatMessages.appendChild(title);
        chatMessages.appendChild(content);
    } catch (error) {
        console.error('Error al obtener la respuesta del chat:', error);
    }
};

// Función para mostrar info-boxes con datos de la API
const fetchInfoBoxes = async (query) => {
    const infoBoxesContainer = document.querySelector('.info-boxes');
    infoBoxesContainer.innerHTML = ''; // Limpiar resultados anteriores

    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&key=AIzaSyDwWto7bTPh5FIQzOCHgankbfaF9Fe777I`);
        const data = await response.json();

        console.log("Respuesta de la API para info-boxes:", JSON.stringify(data, null, 2)); // Depuración

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
                        <h3>${title}</h3>
                        <a href="${videoUrl}" target="_blank">Ver en YouTube</a>
                    `;

                    infoBoxesContainer.appendChild(infoBox);
                }
            });
        } else {
            console.error('Formato inesperado de la API:', data);
            infoBoxesContainer.innerHTML = '<p>No se encontraron resultados.</p>';
        }
    } catch (error) {
        console.error('Error al obtener los temas:', error);
    }
};

const fetchResources = () => {
    const query = queryInput.value;
    fetch(`https://magicloops.dev/api/loop/a0f1f06d-de6c-474c-8ac7-1eb7ae84a880/run?query=${encodeURIComponent(query)}`)
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
                    const title = document.createElement('h3');
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
