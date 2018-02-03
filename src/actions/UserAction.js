import UserModel from '../model/UserModel'
import { guid } from '../guid'

import { realm } from '../model/UserModel'

const Realm = require('realm');

export const createUser = (newUser) => {
  return (dispatch) => {
    // Realm.open({
    //   schema: [UserModel]
    // }).then(realm => {
    //   realm.write(() => {
    //     realm.create('User', { username: newUser.name, password: newUser.password })
    //     console.log(realm.objects('User'))
    //   })
    // })

  }
}

const getSuccessLogin = (dataUser) => {
  return {
    type: 'get_success_login',
    payload: dataUser
  }
}

const getFailedLogin = () => {
  return {
    type: 'get_failed_login',
    payload: false    
  }
}

export const login = (username, password) => {
  return dispatch => {
    // Realm.open({
    //   schema:[UserModel]
    // }).then(realm => {
    //   var oneUser = realm.objects('Users').filtered(`username ="${username}"`)[0]
      
    //   if(oneUser.password === password) {
    //     dispatch(getSuccessLogin(oneUser))
    //   } else {
    //     dispatch(getFailedLogin())
    //   }

    // }).catch((err) => {
    //   dispatch(getFailedLogin())
    // })

    var oneUser = realm.objects('Users').filtered(`username ="${username}"`)[0]

    if(oneUser) {
      if(oneUser.password === password) {
        dispatch(getSuccessLogin(oneUser))
      } else {
        dispatch(getFailedLogin())
      }  
    } else {
      dispatch(getFailedLogin())
    }
  }
}