import React from 'react'
import {
  Text,
  View
} from 'react-native'

const HeaderTableRates = () => {
  return(
    <View style={{ flexDirection: 'row', height: 18, alignItems: "center", backgroundColor: 'black' }}>
      <Text style={{color:'white', width: "15%", textAlign: "center" }}>Coin</Text>
      <Text style={{color:'white', width: "35%", textAlign: "center" }}>Name</Text>
      <Text style={{color:'white', width: "25%", textAlign: "center" }}>Price</Text>
      <Text style={{color:'white', width: "25%", textAlign: "center" }}>Change 24hr</Text>
    </View>
  )
}

export default HeaderTableRates