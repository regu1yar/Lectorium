import React from "react";

function StatusSelector({defaultValue, value, onChange}) {
    return (
        <select value={value} defaultValue={defaultValue} onChange={ev => onChange(ev.target.value)}>
            {["PLANNED", "FAILED", "READY"].map(status =>
                <option value={status} key={status}> {status.toLowerCase()} </option>)
            }
        </select>
    )
}

export default StatusSelector;
