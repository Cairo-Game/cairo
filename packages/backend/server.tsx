// src/index.js
import express from 'express';
import path from 'path';
import helmet from 'helmet';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider as ReduxProvider } from 'react-redux';
import App from '../frontend/src/App';
import { setupStore } from '../../store/Store';
import { sequelize } from './connect-db';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import router from './config/router';
import { modelsReturn } from './helpers/models-return';
import { ThemeService } from './controllers/themeService';
import { html } from './www/htmlPrototype';
import { config } from './config/env';

const app = express();

app.disable('x-powered-by')
    .enable('trust proxy')
    //.set("query parser", queryParser)
    .use(cookieParser())
    //.use(logger)
    .use(router)
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(bodyParser.raw())
    .use('/v1', router)
    .use('/', express.static(path.resolve(__dirname, '../../dist')))
    .use('/', express.static(path.resolve(__dirname, '../../dist/assets/css')));
//.use(notFound);

app.get('/styles.css', (req, res) => {
  res.sendFile(__dirname + "/" + "bundle-scss.css");
});

app.get('/*', (req, res) => {
    const location = req.url;
    const store = setupStore();
    const reduxState = store.getState();
    const component = ReactDOMServer.renderToString(
        <ReduxProvider store={store}>
            <StaticRouter location={location}>
                <App />
            </StaticRouter>
        </ReduxProvider>,
    );

    res.send(html(location, component, reduxState));
});

sequelize.addModels(modelsReturn());
sequelize.sync({ force: true }).then(() => {
    ThemeService.create({
        title: 'LIGHTMODE',
        description: 'Светлая тема для дневного времени суток',
    });
    ThemeService.create({
        title: 'DARKMODE',
        description: 'Темная тема для вечернего времени суток',
    });
    app.listen(config.port, () => {
        console.log('Server started!');
    });
});
