import React from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router';
import {SITE_STRUCTURE} from "./constants";
import {Form} from "./views/managing/form";
import {Overview} from "./views/schedule";
import {Main} from "./views/main";
import {Calendar} from "./views/calendar";
import {Profile} from "./views/profile";
import {connect} from "react-redux";

const ProtectedRoute = connect(
    (state, props) => ({authenticated: state.authentication.authenticated, props})
)(({authenticated, props}) => {
    if (!authenticated)
        return <Redirect to={SITE_STRUCTURE.profile.route}/>
    else
        return <Route {...props}/>
});

const MainRouter = () => (
    <Switch>
        <Route exact path='/' component={Main}/>
        <ProtectedRoute path={SITE_STRUCTURE.managing.route + ":id?"} component={Form}/>
        <ProtectedRoute path={SITE_STRUCTURE.schedule.route} component={Overview}/>
        <ProtectedRoute path={SITE_STRUCTURE.calendar.route} component={Calendar}/>
        <Route path={SITE_STRUCTURE.profile.route} component={Profile}/>
    </Switch>
);

export default withRouter(MainRouter);