import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import {SITE_STRUCTURE} from "./constants";
import {Form} from "./views/managing/form";
import {Overview} from "./views/schedule";
import {Main} from "./views/main";

const MainRouter = () => (
    <Switch>
        <Route exact path='/' component={Main}/>
        <Route path={SITE_STRUCTURE.managing.route} component={Form}/>
        <Route path={SITE_STRUCTURE.schedule.route} component={Overview}/>
    </Switch>
);

export default withRouter(MainRouter);