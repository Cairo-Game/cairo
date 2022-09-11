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
import { html } from "./www/htmlPrototype";

const app = express();

app
  .disable("x-powered-by")
  .enable("trust proxy")
  //.set("query parser", queryParser)
  .use(cookieParser())
  //.use(logger)
  .use(router)
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .use("/v1", router)
  .use("/", express.static(path.resolve(__dirname, "../../dist")));
//.use(notFound);

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

  res.send(html(location, component, reduxState));
});

(async function () {
  sequelize.addModels(modelsReturn());
  await sequelize.sync({ force: true });
  ThemeService.create({
    title: "LIGHTMODE",
    description: "Светлая тема для дневного времени суток",
  });
  ThemeService.create({
    title: "DARKMODE",
    description: "Темная тема для вечернего времени суток",
  });
  app.listen(4000);
})();
