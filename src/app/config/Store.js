import React, { createContext, useContext, useReducer, useCallback } from "react";
import combineReducers from "react-combine-reducers";
import { initialAuth, authReducer } from "../reducers/Authentication";
import { initialIndicators, indicatorReducer } from "../reducers/Indicators";
import { initialQuery, queryReducer } from "../reducers/Query";
import { initialShop, shopReducer } from "../reducers/Shop";
import { initialData, dataReducer } from "../reducers/Data";

const StoreContext = createContext();
const useStore = () => useContext(StoreContext);

const StoreProvider = ({ children }) => {
  const [reducer, globalState] = useCallback(
    combineReducers({
      //TODO Add your local state reducers here
      authentication: [authReducer, initialAuth],
      indicators: [indicatorReducer, initialIndicators],
      data: [dataReducer, initialData],
      filters: [queryReducer, initialQuery],
      shop: [shopReducer, initialShop],
    }),
    [reducer, globalState]
  );
  const [state, dispatch] = useReducer(reducer, globalState);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export { StoreProvider, useStore };
