import React, { createContext, useReducer } from "react";
import {
  initialStore,
  actions as appActions,
  default as storeReducer,
} from "./flux.jsx";

export const Context = createContext(null);

const injectContext = (PassedComponent) => {
  const StoreWrapper = (props) => {
    const [state, dispatch] = useReducer(storeReducer, {}, initialStore);
    const actions = appActions(state, dispatch);

    return (
      <Context.Provider value={{ store: state, actions: actions }}>
        <PassedComponent {...props} />
      </Context.Provider>
    );
  };
  return StoreWrapper;
};

export default injectContext;
