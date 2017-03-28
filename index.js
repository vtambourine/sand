const express = require('express');
const server = express();

const PORT = process.env.PORT || 3000;

const ReactDOMServer = require('react-dom/server');

server.get('/', (request, response) => {
    response.send('<p>Here be dragons</p>');
});

server.get('/render', (request, response) => {
    console.log("hey");
    const template = request.query.tempalte; // DestinationFinder
    const data = JSON.parse(decodeURIComponent(request.query.data)); // JSON { ... }
    // const result = ReactDOMServer.renderToStaticMarkup();
    // const App = require('./src/components/Button');
    Compiler.render(template, data); // send to response

    const Component = require(`./src/templates/${template}`);
    response.send(`
        <pre>
            ${JSON.stringify(data, 0, 4)}
        </pre>
        ${ReactDOMServer.renderToStaticMarkup(<Component context={data}>)}
    `);
});

server.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});
