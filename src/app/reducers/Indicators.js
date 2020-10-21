const initialIndicators = {
  isDataUpdating: true,
  isSortByGroup: false,
  isFilterApplied: false,
};

const indicatorReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA_FLAG":
      return { ...state, isDataUpdating: action.payload };
    case "SET_SORT_FLAG":
      return { ...state, isSortByGroup: action.payload };
    case "SET_FILTER_FLAG":
      return { ...state, isFilterApplied: action.payload };
    default:
      return state;
  }
};

export { initialIndicators, indicatorReducer };
