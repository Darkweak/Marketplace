import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import * as serviceWorker from './serviceWorker';
import { reducers } from './reducers';
import { sagas } from './saga';
import { routes } from './routes';
import './css/bootstrap.min.css';
import './css/override.css';

const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();
const store = createStore(
    combineReducers({
        router: connectRouter(history),
        ...reducers
    }),
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
);

sagas.map(s => sagaMiddleware.run(s));

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                {
                    routes.map((route, index) => <Route key={index} path={route.url} component={route.component}/>)
                }
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
