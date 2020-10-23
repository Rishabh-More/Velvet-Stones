const initialIndicators = {
  dataRefreshed: false,
  isFetchingLinks: true,
  linksRefreshed: false,
  isSortByGroup: false,
  isFilterApplied: false,
};

const indicatorReducer = (state, action) => {
  switch (action.type) {
    case "SET_LINKS_FLAG":
      return { ...state, isFetchingLinks: action.payload };
    case "SET_SORT_FLAG":
      return { ...state, isSortByGroup: action.payload };
    case "SET_FILTER_FLAG":
      return { ...state, isFilterApplied: action.payload };
    case "SET_DATA_REFRESH":
      return { ...state, dataRefreshed: action.payload };
    case "SET_LINKS_REFRESH":
      return { ...state, linksRefreshed: action.payload };
    default:
      return state;
  }
};

export { initialIndicators, indicatorReducer };