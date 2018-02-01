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

export default UserSchema