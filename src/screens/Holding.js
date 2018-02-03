import React, { Component } from 'react'
import {
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { realm } from '../model/UserModel'
import HeaderTableHolding from '../components/HeaderTableHolding'
import { getUserCoin } from '../actions/CoinAction'
import { connect } from 'react-redux'
import { fetchTopRates } from '../actions/CoinAction'
import { fetchUserCoin } from '../actions/CoinAction'
import { refreshUserCoin } from '../actions/CoinAction'
import AddTransactionModal from '../components/AddTransactionModal'
import Header from '../components/Header'


class Holding extends Component {

  constructor() {
    super()

    this.state = {
      totalPriceHolding: 0,
      isLoading: false,
      modalVisible: false,
      transactionStatus: 'buy',
      coin: {},
      quantityCoin: 0,
      totalPrice: 0
    }

    this.changeTransactionStatus = this.changeTransactionStatus.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.saveTransaction = this.saveTransaction.bind(this)
    this.close = this.close.bind(this)
  }  

  componentDidMount() {
    this.props.fetchUserCoin(this.props.topCoin, this.props.idUser)
  }

  componentWillReceiveProps(nextProps) {
    this.countTotalPriceHolding(nextProps.dataUserCoin)
    this.setState({ isLoading: false })
  }

  renderBodyTable = ({item}) => (
    <TouchableOpacity onPress={() => this.setState({ modalVisible: true, coin: item.dataCoin })} style={{marginTop: 10, borderBottomWidth: 0.5, borderBottomColor: "#d6d7da", flexDirection: 'row', justifyContent: "center" }}>
      <View style={{ justifyContent: 'center', height: 38, width: "15%" }}>
        <Text style={{ textAlign: "center", color: "black" }}>{item.symbol}</Text>
      </View>
      <View style={{ justifyContent: 'center', height: 38, width: "35%" }}>
        <Text style={{ textAlign: "center", color: "black" }}>{item.name}</Text>
      </View>
      <View style={{ justifyContent: 'center', height: 38, width: "25%" }}>
        <Text style={{ textAlign: "center", color: "black" }}>{item.quantity}</Text>
        <Text style={{ textAlign: "center", color: "black" }}>${(item.quantity * item.dataCoin.price_usd).toFixed(0)}</Text>
      </View>
      <View style={{ justifyContent: 'center', height: 38, width: "25%" }}>
        <Text style={{ textAlign: "center", color: "black" }}>${item.dataCoin.price_usd}</Text>
        <Text style={{ textAlign: "center", color: "black" }}>{item.dataCoin.percent_change_24h}</Text>
      </View>
    </TouchableOpacity>
  )

  footerComponent() {
    return (
      <View style={{ marginBottom: 20 }} />
    )
  }

  countTotalPriceHolding(dataUserCoin) {

    var totalPriceHolding = 0

    for(var i = 0; i < dataUserCoin.length; i++) {
      totalPriceHolding = totalPriceHolding + (dataUserCoin[i].quantity * dataUserCoin[i].dataCoin.price_usd)
    }

    this.setState({ totalPriceHolding: totalPriceHolding })
  }

  keyExtractor = (item, index) => item.id

  changeTransactionStatus(value) {
    this.setState({ transactionStatus: value })
  }

  handleChange(price, quantity) {
    this.setState({quantityCoin: quantity, totalPrice: price * quantity})
  }

  saveTransaction(nameCoin, symbolCoin) {
    this.setState({ modalVisible: false })
    var checkTransaction = realm.objects('Duit').filtered(`name ="${nameCoin}" AND idUser="${this.props.idUser}"`)[0]

    if(this.state.transactionStatus === 'buy') {
      if(checkTransaction) {
        realm.write(() => {
          checkTransaction.quantity = (Number(checkTransaction.quantity) + Number(this.state.quantityCoin)).toString()
          this.props.refreshUserCoin(this.props.idUser)
        })
      } else {
        realm.write(() => {
          realm.create('Duit', { 
            id: guid(),
            idUser: this.props.idUser,
            name:  nameCoin,
            symbol: symbolCoin,
            quantity: this.state.quantityCoin
          })
        })
      }
    } else {
      if(checkTransaction) {
        realm.write(() => {
          checkTransaction.quantity = (Number(checkTransaction.quantity) - Number(this.state.quantityCoin)).toString()
          this.props.refreshUserCoin(this.props.idUser)
        })
      }
    }
  }

  close() {
    this.setState({ modalVisible: false })
  }

  emptyListComponent() {
    return (
      <View style={{ justifyContent:"center", alignItems: "center" }}>
        <Text>Data tidak ada</Text>
      </View>
    )
  }

  onRefresh() {
    this.setState({ isLoading: true })
    this.props.refreshUserCoin(this.props.idUser)
  }


  render() {
    return(
      <View>
        <Header showDrawer={this.props.navigation.navigate} />
        <Text style={{ marginTop: 5 }}>Total value</Text>
        <Text style={{ color: "black", fontSize: 28, marginTop: 10 }}>$ {(this.state.totalPriceHolding).toFixed(2)}</Text>
        <HeaderTableHolding />
        <AddTransactionModal 
         modalVisible={this.state.modalVisible}
         changeTransactionStatus={this.changeTransactionStatus}
         coin={this.state.coin}
         handleChange={this.handleChange}
         totalPrice={this.state.totalPrice}
         saveTransaction={this.saveTransaction}
         close={this.close} />
        <FlatList
          data={this.props.dataUserCoin}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isLoading}
          renderItem={this.renderBodyTable}
          keyExtractor={this.keyExtractor}
          ListEmptyComponent={this.emptyListComponent.bind(this)}
          ListFooterComponent={this.footerComponent.bind(this)}
        />        




        {/* <Button title="tekan" onPress={() => this.props.navigation.navigate('DrawerOpen')} /> */}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    topCoin: state.CoinReducer.topCoin,
    dataUserCoin: state.CoinReducer.dataUserCoin,
    idUser: state.UserReducer.dataUser.id
  }
}

const mapActionToProps = (dispatch) => {
  return {
    fetchTopRates: () => dispatch(fetchTopRates()),
    fetchUserCoin: (topCoin, idUser) => dispatch(fetchUserCoin(topCoin, idUser)),
    refreshUserCoin: (idUser) => dispatch(refreshUserCoin(idUser))
  }
}

export default connect(mapStateToProps, mapActionToProps)(Holding)