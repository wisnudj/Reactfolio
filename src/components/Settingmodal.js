import React from 'react'
import {
  Button,
  Modal,
  Text,
  TextInput,
  View
} from 'react-native'

const Settingmodal = ({ modalVisible, closeModal, changePassword, handleChange, oldPassword, newPassword, confirmNewPassword }) => {
  return(
    <Modal
    visible={ modalVisible }
    animationType={'slide'}
    onRequestClose={() => closeModal()}
    >
      <View>
        <View>
          <Text>This is content inside of modal component</Text>
          <TextInput value={oldPassword} onChangeText={(text) => handleChange("oldPassword", text)} />
          <TextInput value={newPassword} onChangeText={(text) => handleChange("newPassword", text)} />
          <TextInput value={confirmNewPassword} onChangeText={(text) => handleChange("confirmNewPassword", text)} />
          <Button
            onPress={() => {
              changePassword()
              closeModal()
            }}
            title="Close modal"
          />
        </View>
      </View>        
    </Modal>    
  )
}

export default Settingmodal