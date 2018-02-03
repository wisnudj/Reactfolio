import axios from 'axios'
import { realm } from '../model/UserModel'
import { guid } from '../guid'

const Realm = require('realm');

const getTopRates = (coin) => {
  return {
    type: 'get_top_rates',
    payload: coin
  }
}

export const fetchTopRates = () => {
  return dispatch => {
    axios.get('http://api.coinmarketcap.com/v1/ticker/?limit=25')
         .then(({data}) => {
           dispatch(getTopRates(data))
         })
  }
}

const getUserCoin = (dataUserCoin) => {
  return {
    type: 'get_user_coin',
    payload: dataUserCoin
  }
}

export const fetchUserCoin = (topCoin, idUser) => {
  return dispatch => {
    var userCoins = realm.objects('Duit').filtered(`idUser="${idUser}"`)

    var dataUserCoin = []

    if(userCoins) {
      for(var i = 0; i < userCoins.length; i++) {
        var obj = {}
        topCoinIndex = topCoin.findIndex((elemen) => {
          return elemen.name == userCoins[i].name
        })

        obj = userCoins[i]
        obj.dataCoin = topCoin[topCoinIndex]

        dataUserCoin.push(obj)

      }
    }

    dispatch(getUserCoin(dataUserCoin))
  }
}

export const refreshUserCoin = (idUser) => {
  return dispatch => {

    var cek = realm.objects('Duit').filtered(`idUser="${idUser}"`)

    if(cek) {

      axios.get('http://api.coinmarketcap.com/v1/ticker/?limit=25')
      .then(({data}) => {
  
  
        var userCoins = realm.objects('Duit').filtered(`idUser="${idUser}"`)
        
        var dataUserCoin = []

        var topCoin = data

        for(var i = 0; i < userCoins.length; i++) {
          var obj = {}
          topCoinIndex = topCoin.findIndex((elemen) => {
            return elemen.name == userCoins[i].name
          })
  
          obj = userCoins[i]
          obj.dataCoin = topCoin[topCoinIndex]
  
          dataUserCoin.push(obj)
  
        }

        dispatch(getUserCoin(dataUserCoin))

      })      
    }
  }
}