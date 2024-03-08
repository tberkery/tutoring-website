//server/routes/index.ts
export {}
const { Router } = require('express')
const router = Router()

//router.use('/user', require('./user'))

// router.use('/courses', require('./courses'))
const CourseDaoClass = require('../data/CourseDao');
const CourseDao = new CourseDaoClass();
router.get("/courses/all", async (req: any, res: any ) => {
    try {
      const courses = await CourseDao.readAll();
      res.status(200).json({ courses });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  });

// router.use('/posts', require('./posts.ts'))

// router.use('/profiles', require('./profiles.ts'))

// router.use('/profilePics', require('./profilePics.ts'))

module.exports = router;
