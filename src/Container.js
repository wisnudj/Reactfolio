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
import Setting from './screens/Setting'
import Rates from './screens/Rates'

const OpeningNav = StackNavigator({
  Login: { screen: Login },
  Register: { screen: Register }
}, {
  headerMode: 'none'
})

const MainNav = DrawerNavigator({
  Rates: { screen: Rates },
  Holding: { screen: Holding },
  Setting: { screen: Setting }
})

class Container extends Component {
  render() {
    if(this.props.loginStatus === '' || this.props.loginStatus == 'failed') {
      return(
        <OpeningNav />
      )
    } else {
      return(
        <MainNav />
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
