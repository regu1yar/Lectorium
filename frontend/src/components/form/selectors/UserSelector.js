import React from "react";
import {connect} from "react-redux";

function _UserSelector({users, defaultId, id, onChange, placeholder="выберите пользователя"}) {
    const none = "-1";
    const cb = (ev) => {
        const val = ev.target.value;
        onChange && onChange(val === none ? null : val); // TODO GET USER BY ID
    };
    if (id === null)
        id = none;
    return (
        <select value={id} defaultValue={defaultId} onChange={cb}>
            <option value={none}> {placeholder} </option>
            {users.all.map(({id, name}) =>
                <option value={id} key={id}> {name} </option>)
            }
        </select>
    )
}

const UserSelector = connect(
    state => ({users: state.lectorium_data.users})
)(_UserSelector);

export default UserSelector;
