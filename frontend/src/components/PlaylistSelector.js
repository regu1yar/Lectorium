import React from "react";

function PlaylistSelector({playlists, defaultId, id, onChange}) {
    const cb = (ev) => {
        const val = parseInt(ev.target.value);
        onChange && onChange(val === -1 ? null : playlists[val - 1]); // TODO: GET PLAYLIST BY ID
    };
    if (id === null)
        id = -1;
    return (
        <select value={id} defaultValue={defaultId} onChange={cb}>
            <option value={-1}>выберите плейлист</option>
            {playlists.map(({id, name}) =>
                <option value={id} key={id}> {name} </option>)
            }
        </select>
    )
}

export default PlaylistSelector;

// function RecForm() {
//     return (
//         <form>
//             <select>
//                 {}
//             </select>
//         </form>
//     )
// }
