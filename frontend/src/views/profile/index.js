import {LoginForm} from "../../components/loginForm/LoginForm";
import React from "react";
import "./index.css";
import {connect} from "react-redux";

class _Profile extends React.Component {
    render() {
        return (
            <div className={"holder"}>
                <div className={"placement"}>
                    <LoginForm className={"LoginForm"}/>
                </div>
            </div>
        );
    }
}

const Profile = connect(
    state => ({data: state.lectorium_data})
)(_Profile);

export {Profile};
