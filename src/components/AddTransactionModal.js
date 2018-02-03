import React from 'react'
import {
  Modal,
  Text,
  View,
  TextInput,
  Button,
  StyleSheet
} from 'react-native'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

const AddTransactionModal = ({ close, coin, modalVisible, changeTransactionStatus, handleChange, saveTransaction, totalPrice }) => {
  return(
    <Modal
     visible={ modalVisible }
     animationType={'slide'}
     onRequestClose={() => close()}
    >
      <View style={{ backgroundColor: "#cccccc", flex:1 }}>
        <View>
          <View style={styles.list}>
            <Text>Trading Pair</Text>
            <Text>{coin.symbol}</Text>
          </View>
            <RadioGroup
              onSelect = {(index, value) => changeTransactionStatus(value)}
              style={{backgroundColor: "white", borderBottomWidth: 0.5, borderBottomColor: "#d6d7da", height: 38, flexDirection: 'row', justifyContent:"space-around"}}
              selectedIndex={0}>
              <RadioButton value={'buy'} >
                <Text>buy</Text>
              </RadioButton>
              <RadioButton value={'sell'}>
                <Text>sell</Text>
              </RadioButton>
            </RadioGroup>
        </View>

        <View style={{ marginTop: 5 }}>
          <View style={styles.list}>
            <Text>Current price</Text>
            <Text>$ {coin.price_usd}</Text>
          </View>
          <View style={styles.list}>
            <Text>Enter Quantity</Text>
            <TextInput onChangeText={(text) => handleChange(coin.price_usd, text)} style={{width: 100}} placeholder="enter quantity" />
          </View>
          <View style={styles.list}>
            <Text>Total Value</Text>
            <Text>${totalPrice}</Text>
          </View>
        </View>
        <Button title="Save Transaction" onPress={() => saveTransaction(coin.name, coin.symbol) } />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  list: {
    height: 38, 
    flexDirection: 'row', 
    justifyContent: "space-between", 
    backgroundColor: "white", 
    borderBottomWidth: 0.5, 
    borderBottomColor: "#d6d7da",
    paddingTop: 3,
    paddingLeft: 5,
    paddingRight: 5
  }
})

export default AddTransactionModal