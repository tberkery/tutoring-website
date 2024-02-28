// server/controller/course/index.ts

export {}

const router = require('express').Router()

const Course = require('../../database/models/Course')

router.get('/', async (req: any, res: any) => {
    try {
        console.log('here...')
        const courses = await Course.find();
        res.send(courses)
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
});

router.post('/add', async (req: any, res: any) => {
    console.log('req.body:', req.body);
    try {
        const courses = await Course.find();
        const largestIdCourse = courses.reduce((prev: any, current: any) => (prev.id > current.id) ? prev : current, { id: 10000 });

        const newCourse = new Course({
            id: largestIdCourse.id + 1,
            ...req.body
        });

        await newCourse.save();
        res.send(newCourse);
    } catch (error) {
        console.error('Error adding course: ', error);
    }
})



module.exports = router