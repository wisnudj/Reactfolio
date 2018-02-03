const Realm = require('realm')

const CoinSchema = {
  name: 'Duit',
  primaryKey: 'id',
  properties: {
    id: 'string',
    idUser: 'string',
    name:  'string',
    symbol: 'string',
    quantity: 'string'
  }
}

export default CoinSchema