import React from 'react'
import {
  Button,
  Modal,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native'

const Settingmodal = ({ modalVisible, closeModal, changePassword, handleChange, oldPassword, newPassword, confirmNewPassword, message }) => {
  return(
    <Modal
    visible={ modalVisible }
    animationType={'slide'}
    onRequestClose={() => closeModal()}
    >

        <View>
          <View style={{ backgroundColor: "black", marginBottom: 15, height: 46, paddingLeft: 5, justifyContent: "center"  }}>
            <Text style={{ color: "white" }}>Change Password</Text>
          </View>
          <TextInput secureTextEntry={true} placeholder="Old Password" value={oldPassword} onChangeText={(text) => handleChange("oldPassword", text)} />
          <TextInput secureTextEntry={true} placeholder="New Password" value={newPassword} onChangeText={(text) => handleChange("newPassword", text)} />
          <TextInput secureTextEntry={true} placeholder="Confirm New Password" value={confirmNewPassword} onChangeText={(text) => handleChange("confirmNewPassword", text)} />
          <Text>{message}</Text>
          <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={{justifyContent:"center", height:30, width: 300, backgroundColor: "black" }} onPress={() => {
              changePassword()
            }}>
            <Text style={{ color: "white", textAlign:"center"}}>Change Password</Text>
          </TouchableOpacity>  
          </View>        
        </View>     
    </Modal>    
  )
}

export default Settingmodal