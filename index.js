const express = require('express');
const server = express();

const PORT = process.env.PORT || 3000;

const ReactDOMServer = require('react-dom/server');

server.get('/', (request, response) => {
    response.send('<p>Here be dragons</p>');
});

server.get('/render', (request, response) => {
    console.log("hey");
    const data = JSON.parse(decodeURIComponent(request.query.data));
    // const result = ReactDOMServer.renderToStaticMarkup();
    const App = require('./src/components/Button');
    response.send(`
        <pre>
            ${JSON.stringify(data, 0, 4)}
        </pre>
        ${ReactDOMServer.renderToStaticMarkup(App)}
    `);
});

server.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});
