import React, { Component } from 'react'
import {
  Button,
  Modal,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import UserModel from '../model/UserModel'
import { realm } from '../model/UserModel'
import Header from '../components/Header'

const Realm = require('realm');

//component
import Settingmodal from '../components/Settingmodal'

class Setting extends Component {

  constructor() {
    super()
    this.state = {
      modalVisible: false,
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      message: ''
    }

    this.closeModal = this.closeModal.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  openModal() {
    this.setState({ modalVisible: true })
  }

  closeModal() {
    this.setState({ modalVisible: false })
  }

  changePassword() {
    const { oldPassword, newPassword, confirmNewPassword } = this.state

    if(oldPassword && newPassword && confirmNewPassword) {
      if(oldPassword === this.props.password && newPassword == confirmNewPassword) {
        realm.write(() => {
          const users = realm.objects('Users')
          users.forEach((user) => {
            if(user.id == this.props.id) {
              user.password = this.state.newPassword
            }
          })
        })
        this.closeModal()
      } else if(oldPassword != this.props.password) {
        this.setState({ message: "password salah" })
      } else if(newPassword != confirmNewPassword) {
        this.setState({ message: "new and confirm password tidak sama" })
      }     
    } else {
      this.setState({ message: "tidak boleh kosong" })
    }

  }

  handleChange(name, value) {
    if(name === "oldPassword") {
      this.setState({ oldPassword: value })
    } else if(name === "newPassword") {
      this.setState({ newPassword: value })
    } else if(name === "confirmNewPassword") {
      this.setState({ confirmNewPassword: value })
    }
  }
  
  render() {
    return(
      <View>
        <Header showDrawer={this.props.navigation.navigate} />
        <Settingmodal      
         message={this.state.message}
         modalVisible={this.state.modalVisible} 
         closeModal={this.closeModal} 
         changePassword={this.changePassword}
         handleChange={this.handleChange}
         oldPassword={this.state.oldPassword}
         newPassword={this.state.newPassword}
         confirmNewPassword={this.state.confirmNewPassword} />
         <TouchableOpacity style={{ marginTop: 10, borderBottomWidth: 0.5, borderBottomColor: "#d6d7da", justifyContent: "center" }} onPress={() => this.openModal()}>
           <Text style={{ justifyContent: 'center', height: 38 }}>Change Password</Text>
         </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.UserReducer.dataUser.id,
    username: state.UserReducer.dataUser.username,
    password: state.UserReducer.dataUser.password
  }
}

export default connect(mapStateToProps, null)(Setting)