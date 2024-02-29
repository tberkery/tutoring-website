export {}
//server/controller/index.ts

const { Router } = require('express')
const router = Router()

router.use('/user', require('./user'))

router.use('/course', require('./course'))

router.use('/post', require('./post'))

module.exports = router;
