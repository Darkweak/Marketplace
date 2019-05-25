import React from 'react';
import express from 'express';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';
import { history, sagaMiddleware, store } from './src/index.tsx';
import { Route, Switch } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import { routes } from './src/routes';
import { sagas } from './src/saga/index';

const app = express();
const port = 3001;

app.use('./build');

sagas.map(s => sagaMiddleware.run(s));

app.get('/*', (req, res) => {
  const app = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter history={history}>
        <Switch>
          {
            renderRoutes(
              routes.map(
                (route, index) => <Route key={index} path={route.url} component={route.component}/>
              )
            )
          }
        </Switch>
      </StaticRouter>
    </Provider>
  );

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(renderFullPage(app, store.getState()));
  });
});

const renderFullPage = (html, preloadedState) => (
  `
      <!doctype html>
      <html>
        <head>
            <title>Bienvenue sur ${ process.env.REACT_APP_MARKETPLACE_NAME }</title>
        </head>
        
        <body>
            <div id="app">${html}</div>
            <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
            <script src="/static/bundle.js"></script>
        </body>
      </html>
  `
);

app.listen(port, () => {
    console.log(`😎 Profitez bien ! 😎`);
});
