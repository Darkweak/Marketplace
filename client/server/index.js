import express from 'express';
import React from 'react';
import thunk from 'redux-thunk';
import { render } from './render';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { matchRoutes } from 'react-router-config';
import { reducers } from "../src/reducers";
import { routes } from "../src/routes";

const PORT = 3000;
const app = express();
const BUILD_DIR = 'dist';

app.use(`/${ BUILD_DIR }`, express.static(`./${ BUILD_DIR }`));
app.use('/background.mp4', express.static('./public/background.mp4'));

app.get('*', async (req, res) => {
  const store = createStore(
    combineReducers({
      ...reducers
    }),
    {},
    applyMiddleware(thunk)
  );

  try {
    const actions = matchRoutes(routes, req.path)
      .map(({ route }) => route.component.fetching ? route.component.fetching({...store, path: req.path }) : null)
      .map(async actions => await Promise.all(
        (actions || []).map(p => p && new Promise(resolve => p.then(resolve).catch(resolve)))
        )
      );

    await  Promise.all(actions);
    const context = {};
    const content = render(context, req.path, store);
    res.send(content);
  } catch (e) {
    console.log('===== ERROR =====', e, '============')
  }
});


app.listen(PORT, () => console.log(`Frontend service listening on port: ${PORT}`));
