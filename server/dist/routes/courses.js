"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const CourseDaoClass = require('../data/CourseDao');
const CourseDao = new CourseDaoClass();
router.post("/", async (req, res) => {
    try {
        const courseInfo = req.body;
        const newCourse = await CourseDao.create({ courseInfo });
        res.status(200).json({ newCourse });
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});
router.get("/findOne/:id", async (req, res) => {
    const { id } = req.params;
    try {
        console.log('id: ' + id);
        const course = await CourseDao.readOne(id);
        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }
        res.status(200).json({ course });
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});
router.get("/all", async (req, res) => {
    try {
        const courses = await CourseDao.readAll();
        res.status(200).json({ courses });
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const courseInfo = req.body;
    try {
        const course = await CourseDao.update(id, courseInfo);
        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }
        res.status(200).json({ course });
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const course = await CourseDao.delete(id);
        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }
        res.status(200).json({ course });
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});
module.exports = router;
