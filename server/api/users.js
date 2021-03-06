const router = require('express').Router()
const { models: { User, UserContacts }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/contacts', async (req, res, next) => {
  try {
    const userContacts = await UserContacts.findByPK({
      where: {
        userId: req.params.id
      }

  })
  console.log(userContacts)
  } catch (err) {next(err) }
})


module.exports=router;
