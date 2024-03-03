import { ObjectId } from "mongodb";

export {}
require('dotenv').config()
const CourseDao = require('../../data/CourseDao');
const {faker} = require('@faker-js/faker');
const mg = require("mongoose");
const URI = process.env.ATLAS_URI_TEST

test('test create() with all fields', async ()=> {
    const courseDao = new CourseDao();
    await mg.connect(URI);
    const courseTitle = faker.lorem.word();
    const courseCode =  faker.lorem.word();
    const courseDescription =  faker.lorem.word();
    const courseDepartment =  faker.lorem.word();
    const isUpperLevel = true;
    
    const course =  await courseDao.create(courseTitle, courseCode, courseDepartment, isUpperLevel, courseDescription);
    expect(course.courseTitle).toBe(courseTitle);
    expect(course.courseCode).toBe(courseCode);
    expect(course.courseDepartment).toBe(courseDepartment);
    expect(course.isUpperLevel).toBe(isUpperLevel);
    expect(course.courseDescription).toBe(courseDescription);
});

test('test readOne() for a valid id', async ()=> {
    const courseDao = new CourseDao();
    await mg.connect(URI);
    const courseTitle = faker.lorem.word();
    const courseCode =  faker.lorem.word();
    const courseDescription =  faker.lorem.word();
    const courseDepartment =  faker.lorem.word();
    const isUpperLevel = true;
    
    const course =  await courseDao.create(courseTitle, courseCode, courseDepartment, isUpperLevel, courseDescription);
    expect(course.courseTitle).toBe(courseTitle);
    expect(course.courseCode).toBe(courseCode);
    expect(course.courseDepartment).toBe(courseDepartment);
    expect(course.isUpperLevel).toBe(isUpperLevel);
    expect(course.courseDescription).toBe(courseDescription);

    const id = course._id;
    const foundCourse = await courseDao.readOne(id);
    expect(foundCourse.courseTitle).toBe(courseTitle);
    expect(foundCourse.courseCode).toBe(courseCode);
    expect(foundCourse.courseDepartment).toBe(courseDepartment);
    expect(foundCourse.isUpperLevel).toBe(isUpperLevel);
    expect(foundCourse.courseDescription).toBe(courseDescription);
});

test('test readOne() for an invalid id', async ()=> {
    const courseDao = new CourseDao();
    await mg.connect(URI);
    const id = new ObjectId(1)
    const foundCourse = await courseDao.readOne(id);
    expect(foundCourse).toBe(null);
});


test('test readAll() on non empty table', async ()=> {
    const courseDao = new CourseDao();
    await courseDao.deleteAll()
    await mg.connect(URI);
    for(let i = 0; i < 5; i++){
        const courseTitle = faker.lorem.word();
        const courseCode =  faker.lorem.word();
        const courseDescription =  faker.lorem.word();
        const courseDepartment =  faker.lorem.word();
        const isUpperLevel = true;
        const course =  await courseDao.create(courseTitle, courseCode, courseDepartment, isUpperLevel, courseDescription);
    }
    const courses = await courseDao.readAll();
    expect(courses.length).toBe(5);
});



test('test update()', async ()=> {
    const courseDao = new CourseDao();
    await mg.connect(URI);
    const courseTitle = faker.lorem.word();
    const courseCode =  faker.lorem.word();
    const courseDescription =  faker.lorem.word();
    const courseDepartment =  faker.lorem.word();
    const isUpperLevel = true;
    
    const course =  await courseDao.create(courseTitle, courseCode, courseDepartment, isUpperLevel, courseDescription);
    expect(course.courseTitle).toBe(courseTitle);
    expect(course.courseCode).toBe(courseCode);
    expect(course.courseDepartment).toBe(courseDepartment);
    expect(course.isUpperLevel).toBe(isUpperLevel);
    expect(course.courseDescription).toBe(courseDescription);

    const id = course._id;
    const newCourseDescription = faker.lorem.sentence();
    const updatingDescription = await courseDao.update(id, courseTitle, courseCode, courseDepartment, isUpperLevel, newCourseDescription);
    const updatedCourse = await courseDao.readOne(id)
    expect(updatedCourse.courseTitle).toBe(courseTitle);
    expect(updatedCourse.courseCode).toBe(courseCode);
    expect(updatedCourse.courseDepartment).toBe(courseDepartment);
    expect(updatedCourse.isUpperLevel).toBe(isUpperLevel);
    expect(updatedCourse.courseDescription).toBe(newCourseDescription);
    
});

test('test update() on an invalid ID', async ()=> {
    const courseDao = new CourseDao();
    await mg.connect(URI);
    const courseTitle = faker.lorem.word();
    const courseCode =  faker.lorem.word();
    const courseDescription =  faker.lorem.word();
    const courseDepartment =  faker.lorem.word();
    const isUpperLevel = true;
    const id = new ObjectId(1)
    const updatingDescription = await courseDao.update(id, courseTitle, courseCode, courseDepartment, isUpperLevel, courseDescription);
    expect(updatingDescription).toBe(null);
    
});

test('test delete() with a valid ID', async ()=> {
    const courseDao = new CourseDao();
    await mg.connect(URI);
    const courseTitle = faker.lorem.word();
    const courseCode =  faker.lorem.word();
    const courseDescription =  faker.lorem.word();
    const courseDepartment =  faker.lorem.word();
    const isUpperLevel = true;
    
    const course =  await courseDao.create(courseTitle, courseCode, courseDepartment, isUpperLevel, courseDescription);
    expect(course.courseTitle).toBe(courseTitle);
    expect(course.courseCode).toBe(courseCode);
    expect(course.courseDepartment).toBe(courseDepartment);
    expect(course.isUpperLevel).toBe(isUpperLevel);
    expect(course.courseDescription).toBe(courseDescription);

    const id = course._id;
    const deleting = await courseDao.delete(id);
    expect(deleting.courseTitle).toBe(courseTitle);
    const deleted = await courseDao.readOne(id);
    expect(deleted).toBe(null);
});

test('test delete() for an invalid id', async ()=> {
    await mg.connect(URI);
    const id = new ObjectId(1)
    const courseDao = new CourseDao();
    const foundCourse = await courseDao.delete(id);
    expect(foundCourse).toBe(null);
});