import React, { Component } from 'react'
import {
  Alert,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native'
import { guid } from '../guid'
import { realm } from '../model/UserModel'


class Register extends Component {

  constructor() {

    super()

    this.state = {
      username: "",
      password: "",
      message: ""
    }
  }

  register() {

    console.log(this.props)

    var cek = realm.objects('Users').filtered(`username="${this.state.username}"`)[0]
    console.log(cek)
    if(this.state.username && this.state.password) {
      if(cek) {
        this.setState({ message: "nama sudah pernah dipakai" })
      } else {
        realm.write(() => {
          realm.create('Users', { id: guid(), username: this.state.username, password: this.state.password })
        })
        this.setState({ message: "register berhasil, silahkan login" })

        Alert.alert(
          'Success',
          'Register success',
          [
            {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
          ],
          { cancelable: false }
        )
        
      }
    } else {
      this.setState({ message: "nama atau password tidak boleh kosong" })
    }
  }

  render() {
    return (
      <View style={{ backgroundColor:"#cccccc", flex: 1,alignItems: "center" , justifyContent: 'flex-start'}}>
        <View style={{ width: 300 }}>
          <Text style={{ textAlign: "center", fontSize: 18, marginBottom: 20 }}>Please Register First</Text>
          <TextInput 
          onChangeText={ (text) => this.setState({ username: text }) } 
          placeholder="Username"
          placeholderTextColor="black"
          value={this.state.username}
          />
          <TextInput 
          underlineColorAndroid={'transparent'}
          onChangeText={ (text) => this.setState({ password: text }) }
          placeholder="Password"
          placeholderTextColor="black"
          value={this.state.password}
          />
          <Text>{this.state.message}</Text>
        </View>
        <TouchableOpacity style={{justifyContent:"center", height:30, width: 300, backgroundColor: "black" }} onPress={() => {this.register()}}>
          <Text style={{ color: "white", textAlign:"center"}}>Register</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Register