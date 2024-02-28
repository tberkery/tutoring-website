export {}
//server/controller/index.ts

const { Router } = require('express')
const router = Router()

router.use('/user', require('./user'))

//router.use('/question', require('./question'))

//router.use('/event', require('./event'))

module.exports = router;
