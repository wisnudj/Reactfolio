import React, { Component } from 'react'
import {
  Button,
  Modal,
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'
import UserModel from '../model/UserModel'
import { realm } from '../model/UserModel'

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
      confirmNewPassword: ''
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

    if(oldPassword === this.props.password && newPassword == confirmNewPassword) {
      realm.write(() => {
        const users = realm.objects('Users')
        users.forEach((user) => {
          if(user.id == this.props.id) {
            user.password = this.state.newPassword
          }
        })
      })
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
        <Text>Ini Setting</Text>
        <Settingmodal 
         modalVisible={this.state.modalVisible} 
         closeModal={this.closeModal} 
         changePassword={this.changePassword}
         handleChange={this.handleChange}
         oldPassword={this.state.oldPassword}
         newPassword={this.state.newPassword}
         confirmNewPassword={this.state.confirmNewPassword} />
        <Button
         onPress={() => this.openModal()}
         title="Open modal" />
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