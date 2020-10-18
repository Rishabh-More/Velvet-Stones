const initialAuth={
    isAppStartUp: true,
    isSignedIn: false,
    authToken: "",
};

const authReducer=(state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export { initialAuth, authReducer };