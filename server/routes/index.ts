//server/routes/index.ts

const { Router } = require('express')
const router = Router()

//router.use('/user', require('./user'))

router.use('/courses', require('./courses.ts'))

router.use('/posts', require('./posts.ts'))

router.use('/profiles', require('./profiles.ts'))

router.use('/profilePics', require('./profilePics.ts'))

router.use('/activityPosts', require('./activityPosts.ts'))

module.exports = router;
