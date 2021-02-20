import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import userReducer from "./user/reducer";
import roomsReducer from "./rooms/reducer";
import bykSaga from "./saga/RSSaga";

const combinedReducer = combineReducers({
  user: userReducer,
  rooms: roomsReducer
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(bykSaga);

export default store;
