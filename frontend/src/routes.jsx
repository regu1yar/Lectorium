import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import App from "./App";
import {SITE_STRUCTURE} from "./constants";

const MainRouter = () => (
    <Switch>
        <Route exact path='/' component={App}/>
        {/*<Route path={SITE_STRUCTURE.todo.route} component={ToDoList}/>*/}
    </Switch>
);

export default withRouter(MainRouter);