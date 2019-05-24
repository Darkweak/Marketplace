let Express = require('express');
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { history, sagaMiddleware, store } from './src/index.tsx';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { routes } from './src/routes';
import { sagas } from './src/saga/index';

const app = Express(); // eslint-disable-line new-cap
const port = 3001;

// Serve static files
app.use('/static', Express.static('static'));

// This is fired every time the server side receives a request
app.use(handleRender);

sagas.map(s => sagaMiddleware.run(s));

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
    const html = renderToString(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    {
                        routes.map((route, index) => <Route key={index} path={route.url} component={route.component}/>)
                    }
                </Switch>
            </ConnectedRouter>
        </Provider>
    );

    // Grab the initial state from our Redux store
    const finalState = store.getState();

    // Send the rendered page back to the client
    res.send(renderFullPage(html, finalState));
}

function renderFullPage(html, preloadedState) {
    return `
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
  `;
}

app.listen(port, () => {
    console.log(`SSR server started at http://localhost:${port}`); // eslint-disable-line no-console
});
