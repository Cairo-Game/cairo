// src/index.js
import express from "express";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Provider as ReduxProvider } from "react-redux";
import App from "../frontend/src/App";
import { setupStore } from "../../store/Store";
import { sequelize } from "./connect-db";
import { queryParser } from "express-query-parser";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import router from "./config/router";
import { modelsReturn } from "./helpers/models-return";
import { ThemeService } from "./controllers/themeService";

const app = express();

app
  .disable("x-powered-by")
  .enable("trust proxy")
  .set("query parser", queryParser)
  .use(cookieParser())
  //.use(logger)
  .use(router)
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw());
//.use(notFound);

app.use("/", express.static(path.resolve(__dirname, "../../dist")));

app.get("/*", (req, res) => {
  const location = req.url;
  const store = setupStore();
  const reduxState = store.getState();
  const component = ReactDOMServer.renderToString(
    <ReduxProvider store={store}>
      <StaticRouter location={location}>
        <App />
      </StaticRouter>
    </ReduxProvider>
  );

  const html = `
  <!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${location.slice(1).toUpperCase()}</title>
</head>
<body>
<div id="main">${component}</div>
<script>
        window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
    </script>
    <script src="/main.js"></script>
</body>
</html>`;

  res.send(html);
});

app.use("/v1", router);

(async function () {
  sequelize.addModels(modelsReturn());
  await sequelize.sync({ force: true });
  ThemeService.create({title: 'Светлая тема', description: 'Светлая тема для дневного времени суток'});
  ThemeService.create({title: 'Темная тема', description: 'Темная тема для вечернего времени суток'})
  app.listen(4000);
})();
