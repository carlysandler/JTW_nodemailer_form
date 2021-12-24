const {db, models: {User, Contact, UserContacts} } = require('../server/db')
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
    await db.models.contact.bulkCreate(contacts)
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
 */
const generateJSON = (num) => {
  const contacts = Array(num).fill({}).map(o => {
    const firstName = faker.name.firstName()
    const lastName  = faker.name.lastName()
    return {
      firstName,
      lastName,
      email: (`${firstName}.${lastName}@gmail.com`).toLowerCase()
    }
  })


  fs.writeFileSync(`${__dirname}/contacts.json`, JSON.stringify(contacts, null, 2))


}



async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}



module.exports = {
  seed,
  generateJSON
}

if (require.main === module){
  runSeed()
}
else {
  runSeed()
}
