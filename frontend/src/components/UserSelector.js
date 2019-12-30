import React from "react";

function UserSelector({users, defaultId, id, onChange, placeholder="выберите пользователя"}) {
    const cb = (ev) => {
        const val = parseInt(ev.target.value);
        onChange && onChange(val === -1 ? null : users[val - 1]); // TODO GET USER BY ID
    };
    if (id === null)
        id = -1;
    return (
        <select value={id} defaultValue={defaultId} onChange={cb}>
            <option value={-1}> {placeholder} </option>
            {users.map(({id, name}) =>
                <option value={id} key={id}> {name} </option>)
            }
        </select>
    )
}

export default UserSelector;
