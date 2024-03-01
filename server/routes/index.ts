//server/routes/index.ts

const { Router } = require('express')
const router = Router()

//router.use('/user', require('./user'))

router.use('/courses', require('./courses.ts'))

router.use('/posts', require('./posts.ts'))

router.use('/profiles', require('./profiles.ts'))

module.exports = router;
