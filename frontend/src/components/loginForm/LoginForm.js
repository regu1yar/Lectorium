import {connect} from "react-redux";
import {login, logout} from "../../actions/authentication";
import React from "react";
import {Field, Form, Formik} from "formik";
import "./LoginForm.css";

function _LoginForm({authenticated, login, logout}) {
    if (authenticated === null) {
        return (
            <div>
                Loading authentication status...
            </div>
        );
    } else if (authenticated) {
        return (
            <div className={'loggedIn'}>
                You are logged in!
                <br/>
                <br/>
                <button onClick={() => logout()} className={"button"}><span>LOGOUT</span></button>
            </div>
        );
    } else {
        return (
            <div className={'loggedOut'}>
                UNAUTHORIZED
                <Formik initialValues={{username: "Mask", password: "p"}}
                        onSubmit={vals => login(vals.username, vals.password)}
                >
                    <Form>
                        <Field name="username"/>
                        <Field type="password" name="password"/>
                        <br/>
                        <button type="submit" className={"button"}><span>LOGIN</span></button>
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