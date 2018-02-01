import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/Index'
import thunk from 'redux-thunk'

let store = createStore(rootReducer, applyMiddleware(thunk))

export default store