import React, { Component } from 'react'
import {
  Text
} from 'react-native'

import { StackNavigator, DrawerNavigator } from 'react-navigation'
import { connect } from 'react-redux'

// screen
import Login from './screens/Login'
import Register from './screens/Register'
import Holding from './screens/Holding'

const OpeningNav = StackNavigator({
  Login: { screen: Login },
  Register: { screen: Register }
})

const MainNav = DrawerNavigator({
  Holding: { screen: Holding }
})

class Container extends Component {
  render() {
    console.log(this.props.loginStatus)
    if(this.props.loginStatus === '' || this.props.loginStatus == 'failed') {
      return(
        <OpeningNav />
      )
    } else {
      return(
        <Holding />
      )
    }
  }
}

const mapStateToProps = (state) => {
  console.log(state.UserReducer.loginStatus)
  return {
    loginStatus: state.UserReducer.loginStatus
  }
}

export default connect(mapStateToProps, null)(Container)
