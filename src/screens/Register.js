import React, { Component } from 'react'
import {
  Text,
  View,
  TextInput,
  Button
} from 'react-native'


class Register extends Component {

  constructor() {

    super()

    this.state = {
      username: "",
      password: ""
    }
  }

  componentDidMount() {

  }

  register() {
    // Realm.open({
    //   schema: [UserModel]
    // }).then(realm => {
    //   realm.write(() => {
    //     realm.create('Users', { id: guid(), username: this.state.username, password: this.state.password })
    //   })
    // })
  }

  render() {
    return (
      <View>
        <Text>Please Register First</Text>
        <TextInput 
         onChangeText={ (text) => this.setState({ username: text }) } 
         placeholder="Username"
         placeholderTextColor="#cecaca"
         value={this.state.username}
         />
        <TextInput 
         onChangeText={ (text) => this.setState({ password: text }) }
         placeholder="Password"
         placeholderTextColor="#cecaca"
         value={this.state.password}
        />
        <Button title="register" onPress={() => {this.register()}} />
        <Button title="Hapus" onPress={() => {this.hapus()}} />
      </View>
    )
  }
}

export default Register