import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "../reducers";

export default function configureStore(preloadedState) {
  let composedEnhancers;

  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];

  if (process.env.NODE_ENV === "development") {
    console.log(process.env.NODE_ENV, "dev");
    composedEnhancers = composeWithDevTools(...enhancers);
  } else {
    console.log(process.env.NODE_ENV, "prod");
    composedEnhancers = compose(...enhancers);
  }

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
