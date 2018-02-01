const initialState = {
  loginStatus: '',
  dataUser: {}
}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'get_success_login':
     return { ...state, loginStatus: 'success', dataUser: action.payload }
    case 'get_failed_login':
     return { ...state, loginStatus: 'failed' }
    default:
     return state
  }
}

export default UserReducer