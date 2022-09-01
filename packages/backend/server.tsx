// src/index.js
import express from "express";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Provider as ReduxProvider } from "react-redux";
import App from "../frontend/src/App";
import { setupStore } from "../../store/Store";

const app = express();

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

app.listen(4000);
