//this is the access point for all things database related!

const db = require('./db')
const Sequelize = require('sequelize')

const User = require('./models/User')
const Contact = require('./models/Contact')
const UserContacts = db.define('usercontacts', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  contactId: {
    type: Sequelize.INTEGER,
    references: {
      model: Contact,
      key: 'id'
    }
  }
} );
//associations could go here!
User.belongsToMany(Contact, {through: 'usercontacts'});
Contact.belongsToMany(User, {through: 'usercontacts'});

module.exports = {
  db,
  models: {
    User,
    Contact,
    UserContacts
  },
}
