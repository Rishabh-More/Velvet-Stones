const initialData = {
  catalogue: [],
  products: [],
  designs: [],
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
    case "SEARCH_PRODUCTS":
      //State here only has initialData fields.
      return { ...state, products: action.payload };
    case "UPDATE_DESIGNS":
      return { ...state, designs: action.payload };
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "ADD_ALL_TO_CART":
      return { ...state, cart: state.cart.concat(action.payload) };
    case "DELETE_FROM_CART":
      return {
        ...state,
        cart: [...state.cart.slice(0, action.payload), ...state.cart.slice(action.payload + 1)],
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "UPDATE_LINKS":
      return { ...state, links: action.payload };
    case "UPDATE_LINKS_OTP":
      const index = state.links.map((item) => item.id).indexOf(action.payload.id);
      return {
        ...state,
        links: [
          ...state.links.slice(0, index),
          {
            ...state.links[index],
            otp: action.payload.otp,
            otpCreatedAt: action.payload.otpCreatedAt,
            otpexpireAt: action.payload.otpExpireAt,
            updatedAt: action.payload.updatedAt,
          },
          ...state.links.slice(index + 1),
        ],
      };
    case "DELETE_LINK":
      return {
        ...state,
        links: [...state.links.slice(0, action.payload), ...state.links.slice(action.payload + 1)],
      };
    default:
      return state;
  }
};

export { initialData, dataReducer };
