import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import indexRoutes from "routes/index.jsx";

const hist = createBrowserHistory();
const requireAuth = (nextState, replace) => {
    if (!localStorage.getItem("access_token")) {
        replace({
            pathname: '/login'
        })
    }
};
ReactDOM.render(
    <Provider store={configureStore()}>
        <Router history={hist}>
            <Switch>
                {indexRoutes.map((prop, key) => {
                    return <Route path={prop.path} component={prop.component} componentWillReceiveProps={requireAuth}  key={key} />;
                })}
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);

