const initialData = {
  catalogue: [],
  products: [],
  filter: [],
  cart: [],
  links: [],
};

const dataReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, catalogue: action.payload, products: action.payload };
    case "UPDATE_PRODUCTS":
      return { ...state, products: action.payload };
    case "UPDATE_LINKS":
      return { ...state, links: action.payload };
    default:
      return state;
  }
};

export { initialData, dataReducer };
