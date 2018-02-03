const Realm = require('realm')

const UserSchema = {
  name: 'Users',
  primaryKey: 'id',
  properties: {
    id: 'string',
    username:  'string',
    password: 'string'
  }
}

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

export const realm = new Realm({
  schema:[UserSchema, CoinSchema]
})

export default UserSchema