const initialIndicators={
    isDataUpdating: true,
};

const indicatorReducer=(state, action) => {
    switch (action.type) {
        case 'SET_DATA_FLAG':
            return {...state, isDataUpdating: action.payload}
        default:
            return state;
    }
};

export {initialIndicators, indicatorReducer};