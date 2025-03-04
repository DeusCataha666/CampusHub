document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const queryInput = document.getElementById('queryInput');
    
    const fetchResources = () => {
        const query = queryInput.value;
        fetch(`https://magicloops.dev/api/loop/a0f1f06d-de6c-474c-8ac7-1eb7ae84a880/run?query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                const chatMessages = document.getElementById('chatMessages');
                chatMessages.innerHTML = ''; // Limpiar contenido anterior

                // Crear elementos HTML para estilizar la respuesta
                const title = document.createElement('h3');
                title.textContent = 'Respuesta:';
                
                const content = document.createElement('p');
                content.innerHTML = formatResponse(data.answer);

                chatMessages.appendChild(title);
                chatMessages.appendChild(content);
            })
            .catch(error => console.error('Error fetching resources:', error));
    };

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

    searchButton.addEventListener('click', fetchResources);

    queryInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            fetchResources();
        }
    });
});
