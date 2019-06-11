import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
//import * as serviceWorker from './serviceWorker';
import { reducers } from './reducers';
import { routes } from './routes';
import './css/override.css';

export const history: any = createBrowserHistory();
export const store = createStore(
    combineReducers({
        router: connectRouter(history),
        ...reducers
    }),
    {},
    applyMiddleware(routerMiddleware(history), thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                {
                    routes.map((route, index) => <Route key={index} path={route.path} component={route.component}/>)
                }
            </Switch>
        </ConnectedRouter>
    </Provider>,
    window.document && window.document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
