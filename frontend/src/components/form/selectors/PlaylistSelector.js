import React from "react";
import {connect} from "react-redux";

function _PlaylistSelector({playlists, defaultId, id, onChange}) {
    const cb = (ev) => {
        const val = parseInt(ev.target.value);
        onChange && onChange(val === -1 ? null : val); // TODO: GET PLAYLIST BY ID
    };

    // haha, assuming id -1 is not a valid id (yes)
    if (id === null)
        id = -1;

    return (
        <select value={id} defaultValue={defaultId} onChange={cb}>
            <option value={-1}>выберите плейлист</option>
            {playlists.all.map(({id, name}) =>
                <option value={id} key={id}> {name} </option>)
            }
        </select>
    )
}

const PlaylistSelector = connect(
    state => ({playlists: state.playlists})
)(_PlaylistSelector);

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
