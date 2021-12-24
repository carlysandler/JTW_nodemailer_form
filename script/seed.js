const {db, models: {User, Contact, UserContacts} } = require('../server/db/index')
const contacts = require('./contacts.json')
const fs = require('fs')
const faker = require('faker')

const seed = async () => {
  try {
    console.log('syncing DB...')
    await db.sync({ force: true })
    console.log('db synced!')

    console.log('seeding DB...')
    // creating contacts
    const contacts = Array(10).fill({}).map(o => {
      const firstName = faker.name.firstName()
      const lastName  = faker.name.lastName()
      return {
        firstName,
        lastName,
        email: (`${firstName}.${lastName}@gmail.com`).toLowerCase()
      }
    })

    await Contact.bulkCreate(contacts)
    console.log(`seeded ${contacts.length} contacts`)
    // creating users
    const users = await Promise.all([
      User.create({ username: 'csandler95', password: 'asecret123'}),
      User.create({ username: 'gracehopper', password: 'asecret123'})
    ])



    console.log(`seeded ${users.length} users`)

    const userContacts = await Promise.all([
      UserContacts.create({userId: 1, contactId: 1}),
      UserContacts.create({userId: 1, contactId: 5}),
      UserContacts.create({userId: 2, contactId: 2})
    ])

    console.log('seeded all!')
    db.close()
    return {
      users: {
        csandler95: users[0],
        gracehopper: users[1]
      },
      userContacts: {
        1: userContacts[0, 1],
        2: userContacts[2]
      }

    }



 } catch (e) {
    console.error(e)
  }
}

/**
 * This function is used to generate the contents of contacts.json
**/



module.exports = {
  seed
}

if (require.main === module){
  seed()
}
