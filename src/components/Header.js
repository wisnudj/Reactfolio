import React from 'react'
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const Header = ({ showDrawer }) => {
  var active = false
  return(
    <View style={{ height: 46, flexDirection: 'row', alignItems: "center", backgroundColor: 'black' }}>
      <TouchableOpacity style={{marginLeft: 5}} onPress={() => showDrawer('DrawerOpen')} >
        <Icon name="navicon" size={30} color="white" />
      </TouchableOpacity>
      <Text style={{ color: "white", marginLeft: 10 }}>React Folio</Text>
    </View>
  )
}

export default Header