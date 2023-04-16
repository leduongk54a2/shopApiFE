import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore  } from "redux"
import thunkMiddleware from "redux-thunk"
import reducers from "./reducer"

const middlewareEnhancer = applyMiddleware(thunkMiddleware)
const composedEnhancers = compose(middlewareEnhancer)

const rootReducer = combineReducers(reducers)

const store = createStore(rootReducer, composedEnhancers)

export default store