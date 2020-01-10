const DefaultState = {
    authenticated: null, // true, false, null (when loading)
};

function authentication(state=DefaultState, action) {
    switch (action.type) {
        case "AUTH":
            return {authenticated: action.authenticated};
        default:
            return state;
    }
}

export {authentication};