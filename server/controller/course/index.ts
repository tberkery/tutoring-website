// server/controller/course/index.ts

export {}

const router = require('express').Router()

const Course = require('../../database/models/Course')

// TESTED get all courses, mostly for dev purposes
router.get('/', async (req: any, res: any) => {
    try {
        const courses = await Course.find();
        res.send(courses)
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
});

// TESTED create a new course
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

// TESTED updating a course
router.put('/:id', async (req: any, res: any) => {
    try {
        let course = await Course.findOne({ id: req.params.id });
        if (!course) {
            return res.status(404).send('Course not found');
        }
        course.set(req.body);
        await course.save();
        res.send(course);
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).send('Internal Server Error');
    }
});


// TESTED deleting a course profile
router.delete('/:id', async (req: any, res: any) => {
    try {
        await Course.findOneAndDelete({ id: req.params.id });
        res.send('course deleted');
    } catch (error) {
        console.error('Error deleting course:', error);
    }
});


module.exports = router