import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { routes } from "../src/routes";

export const render = (context, path, store) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={path} context={context}>
        {
          renderRoutes(routes)
        }
      </StaticRouter>
    </Provider>
  );


  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"/>
    <link rel="stylesheet" href="https://bootswatch.com/4/lux/bootstrap.min.css"/>
    <link rel="stylesheet" href="https://sylvaincdn.000webhostapp.com/main.css"/>
    <title>Marketplace</title>
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root">${content}</div>
    <script>window.INITIAL_STATE = ${JSON.stringify(store.getState())}</script>
    <script src="https://sylvaincdn.000webhostapp.com/bundle.js"></script>
  </body>
</html>
  `;
};
