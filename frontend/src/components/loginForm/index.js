import {connect} from "react-redux";
import {login, logout} from "../../actions/authentication";
import React from "react";
import {Field, Form, Formik} from "formik";

function _LoginForm({authenticated, login, logout}) {
    if (authenticated === null) {
        return (
            <div>
                Loading authentication status...
            </div>
        );
    } else if (authenticated) {
        return (
            <div>
                LOGGED IN
                <button onClick={() => logout()}>LOGOUT</button>
            </div>
        );
    } else {
        return (
            <div>
                UNAUTHORIZED
                <Formik initialValues={{username: "", password: ""}}
                        onSubmit={vals => login(vals.username, vals.password)}
                >
                    <Form>
                        <Field name="username"/>
                        <Field type="password" name="password"/>
                        <button type="submit"> login </button>
                    </Form>
                </Formik>
            </div>
        );
    }
};

const LoginForm = connect(
    state => ({authenticated: state.authentication.authenticated}),
    dispatch => ({
        login: (username, password) => dispatch(login(username, password)),
        logout: () => dispatch(logout),
    })
)(_LoginForm);

export {LoginForm};