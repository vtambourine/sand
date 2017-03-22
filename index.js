const express = require('express');
const server = express();

const PORT = process.env.PORT || 3000;

server.get('/', (request, response) => {
    response.send('<p>Here be dragons</p>');
});

server.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});
