import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import shop from "./reducers/shopReducer";

// convert object to string and store in localStorage
const saveToLocalStorage = (state) => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
};

// load string from localStarage and convert into an Object
// invalid output must be undefined
const loadFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (
      serialisedState === null ||
      serialisedState?.shop?.products?.length === 0
    )
      return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      shop,
    }),
    loadFromLocalStorage(),
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );
  store.subscribe(() => saveToLocalStorage(store.getState()));
  return store;
};
