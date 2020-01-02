import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import App from "./App";
import {SITE_STRUCTURE} from "./constants";
import {Form} from "./views/managing/form"

const MainRouter = () => (
    <Switch>
        <Route exact path='/' component={App}/>
        <Route path={SITE_STRUCTURE.managing.route} component={Form}/>
    </Switch>
);

export default withRouter(MainRouter);