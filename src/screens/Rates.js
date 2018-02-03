import React, { Component } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { fetchTopRates } from '../actions/CoinAction'
import AddTransactionModal from '../components/AddTransactionModal'
import CoinModel from '../model/CoinModel'
import UserModel from '../model/UserModel'
import { guid } from '../guid'
import { realm } from '../model/UserModel'

const Realm = require('realm');

//component
import HeaderTableRates from '../components/HeaderTableRates'

class Rates extends Component {

  constructor() {
    super()

    this.state = {
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
    this.props.fetchTopRates()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isLoading: false })
  }

  emptyListComponent() {
    return (
      <View style={{ justifyContent:"center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  handleChange(price, quantity) {
    this.setState({quantityCoin: quantity, totalPrice: price * quantity})
  }

  renderBodyTable = ({item}) => (
    <TouchableOpacity onPress={() => this.setState({ modalVisible: true, coin: item })} style={{ borderBottomWidth: 0.5, borderBottomColor: "#d6d7da", flexDirection: 'row', justifyContent: "center" }}>
      <View style={{ justifyContent: 'center', height: 32, width: "15%" }}>
        <Text style={{ textAlign: "center" }}>{item.symbol}</Text>
      </View>
      <View style={{ justifyContent: 'center', height: 32, width: "35%" }}>
        <Text style={{ textAlign: "center" }}>{item.name}</Text>
      </View>
      <View style={{ justifyContent: 'center', height: 32, width: "25%" }}>
        <Text style={{ textAlign: "center" }}>{item.price_usd}</Text>
      </View>
      <View style={{ justifyContent: 'center', height: 32, width: "25%" }}>
        <Text style={{ textAlign: "center" }}>{item.percent_change_24h}%</Text>
      </View>
    </TouchableOpacity>
  )

  footerComponent() {
    return (
      <View style={{ marginBottom: 20 }} />
    )
  }

  onRefresh() {
    this.setState({ isLoading: true })
    this.props.fetchTopRates()
  }

  changeTransactionStatus(value) {
    this.setState({ transactionStatus: value })
  }

  close() {
    this.setState({ modalVisible: false })
  }

  saveTransaction(nameCoin, symbolCoin) {
    this.setState({ modalVisible: false })
    var checkTransaction = realm.objects('Duit').filtered(`name ="${nameCoin}" AND idUser="${this.props.idUser}"`)[0]

    if(this.state.transactionStatus === 'buy') {
      if(checkTransaction) {
        realm.write(() => {
          checkTransaction.quantity = (Number(checkTransaction.quantity) + Number(this.state.quantityCoin)).toString()
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
        })
      }
    }

      // realm.write(() => {
      //   realm.create('Duit', { 
      //     id: guid(),
      //     idUser: this.props.idUser,
      //     name:  nameCoin,
      //     symbol: symbolCoin,
      //     quantity: this.state.quantityCoin
      //   })
      // })    
  }

  keyExtractor = (item, index) => item.id

  render() {
    return(
      <View>
        <HeaderTableRates />
        <AddTransactionModal 
         modalVisible={this.state.modalVisible}
         changeTransactionStatus={this.changeTransactionStatus}
         coin={this.state.coin}
         handleChange={this.handleChange}
         totalPrice={this.state.totalPrice}
         saveTransaction={this.saveTransaction}
         close={this.close} />
        <FlatList
          data={this.props.topCoin}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isLoading}
          renderItem={this.renderBodyTable}
          keyExtractor={this.keyExtractor}
          ListEmptyComponent={this.emptyListComponent.bind(this)}
          ListFooterComponent={this.footerComponent.bind(this)}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    topCoin: state.CoinReducer.topCoin,
    idUser: state.UserReducer.dataUser.id
  }
}

const mapActionToProps = (dispatch) => {
  return {
    fetchTopRates: () => dispatch(fetchTopRates())
  }
}

export default connect(mapStateToProps, mapActionToProps)(Rates)