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
      password: '',
      message: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.loginStatus === 'failed') {
      this.setState({ message: "username atau password salah" })
    }
  }

  login() {
    if(this.state.username && this.state.password) {
      this.props.login(this.state.username, this.state.password)
    } else {
      this.setState({ message: "username atau password tidak boleh kosong" })
    }
  }

  render() {
    const { navigate } = this.props.navigation
    return(
      <View style={{ backgroundColor:"#161616", flex: 1,alignItems: "center" , justifyContent: 'space-around'}}>
        <View>
          <Text style={{ fontSize: 42, color:"#cccccc" }}>React</Text>
          <Text style={{ fontSize: 42, color: "#cccccc" }} >Folio</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TextInput
          style={{ width: 300, color: "#cccccc" }}
          underlineColorAndroid={'white'}
          placeholder="username"
          placeholderTextColor="#cecaca"
          onChangeText={(text) => {this.setState({ username: text })}}
          value={this.state.username}
          />
          <TextInput
          secureTextEntry={true}
          style={{ width: 300, color: "#cccccc" }}
          placeholder="password"
          placeholderTextColor="#cecaca"
          onChangeText={(text) => {this.setState({ password: text })}}
          value={ this.state.password }
          />
          <Text style={{ textAlign: "center", color: "white" }}>{this.state.message}</Text>
          <TouchableOpacity style={{ backgroundColor: "#cccccc", width:150, height: 28, justifyContent:"center" }} onPress={() => this.login()}>
            <Text style={{ textAlign: "center", color:"black" }}>LOGIN</Text>
          </TouchableOpacity>

          <View>
            <Text style={{ textAlign: "center", color: "white", marginTop: 10, marginBottom: 10 }} >or</Text>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity style={{backgroundColor: "#cccccc", width:150, height: 28, justifyContent:"center"  }} onPress={() => navigate('Register')}>
                <Text style={{textAlign: "center", color: "black" }}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loginStatus: state.UserReducer.loginStatus
  }
}

const mapActionToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(login(username, password))
  }
}

export default connect(mapStateToProps, mapActionToProps)(Login)