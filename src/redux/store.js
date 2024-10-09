import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { headerReducer, detailReducer } from "./reducers";

const rootReducer = combineReducers({
  headerData: headerReducer,
  detailData: detailReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
