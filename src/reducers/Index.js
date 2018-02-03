import { combineReducers } from 'redux'
import UserReducer from './UserReducer'
import CoinReducer from './CoinReducer'

const rootReducer = combineReducers({
  CoinReducer,
  UserReducer
})

export default rootReducer