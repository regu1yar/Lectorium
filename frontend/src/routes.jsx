import React from 'react';
import {Route, Switch, withRouter} from 'react-router';
import {SITE_STRUCTURE} from "./constants";
import {Form} from "./views/managing/form";
import {Overview} from "./views/schedule";
import {Main} from "./views/main";
import {Calendar} from "./views/calendar";
import {Profile} from "./views/profile";

const MainRouter = () => (
    <Switch>
        <Route exact path='/' component={Main}/>
        <Route path={SITE_STRUCTURE.managing.route + ":id?"} component={Form}/>
        <Route path={SITE_STRUCTURE.schedule.route} component={Overview}/>
        <Route path={SITE_STRUCTURE.calendar.route} component={Calendar}/>
        <Route path={SITE_STRUCTURE.profile.route} component={Profile}/>
    </Switch>
);

export default withRouter(MainRouter);