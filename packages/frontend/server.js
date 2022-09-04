import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

const app = express();
const PORT = 3000;

function makeHTMLPage(content) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>From SSR with Love</title>
        </head>
        <body>
        <div id="root">${content}</div>
        </body>
        </html>
`;
}

const mySuperApp = <div>Контент приложения теперь в JSX</div>;

app.get('/', (req, res) => {
    const appContentHTML = renderToString(mySuperApp);
    res.send(makeHTMLPage(appContentHTML));
});

app.listen(PORT, () => {
    console.log(`App on http://localhost:${PORT}`);
});
