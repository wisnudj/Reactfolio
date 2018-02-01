import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { connect } from 'react-redux'
import { login } from '../actions/UserAction'

class Login extends Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  login() {
    // Realm.open({
    //   schema:[UserModel]
    // }).then(realm => {
    //   var oneUser = realm.objects('Users').filtered(`username ="${this.state.username}"`)[0]
      
    //   if(oneUser.password === this.state.password) {
    //     console.log('berhasil')
    //   } else {
    //     console.log('salah')
    //   }

    // }).catch((err) => {
    //   console.log('salah')
    // })
    const { username } = this.state
    const { password } = this.state
    this.props.login(username, password)
  }

  render() {
    const { navigate } = this.props.navigation
    return(
      <View>
        <Text>Ini login</Text>
        <TextInput
        placeholder="username"
        placeholderTextColor="#cecaca"
        onChangeText={(text) => {this.setState({ username: text })}}
        value={this.state.username}
        />
        <TextInput
        placeholder="password"
        placeholderTextColor="#cecaca"
        onChangeText={(text) => {this.setState({ password: text })}}
        value={ this.state.password }
        />
        <TouchableOpacity onPress={() => this.login()}>
          <Text>LOGIN</Text>
        </TouchableOpacity>
        <View>
          <Text style={{ textAlign: "center" }} >or</Text>
            <View>
              <Text>Create an account if you dont have an </Text>
              <TouchableOpacity onPress={() => navigate('Register')}><Text>account</Text></TouchableOpacity>
            </View>
          </View>
      </View>
    )
  }
}

const mapActionToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(login(username, password))
  }
}

export default connect(null, mapActionToProps)(Login)