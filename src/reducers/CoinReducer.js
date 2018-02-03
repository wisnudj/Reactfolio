const initialState = {
  topCoin: [],
  dataUserCoin: []
}

const CoinReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'get_top_rates':
     return { ...state, topCoin: action.payload }
    case 'get_user_coin':
     return { ...state, dataUserCoin: action.payload }
    default:
     return state
  }
}

export default CoinReducer