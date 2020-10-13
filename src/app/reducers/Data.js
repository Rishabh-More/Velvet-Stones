const initialData={
  catalogue: [],
  products: [],
  filter: [],
  cart: [],
  links: [],
};

const dataReducer=(state, action) => {
  switch (action.type) {
    case 'UPDATE_PRODUCTS':
      return {...state, products: action.payload}
    default:
      return state;
  }
};

export {initialData, dataReducer};
