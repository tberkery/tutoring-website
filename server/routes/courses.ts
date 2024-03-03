import exp from "constants";

const router = require('express').Router();
const CourseDaoClass = require('../data/CourseDao');
const CourseDao = new CourseDaoClass();

router.post("/", async (req: any, res: any) => {
  try {
    const {courseTitle, courseCode, courseDepartment, isUpperLevel, courseDescription}: {courseTitle:string, courseCode:string, courseDepartment:string, isUpperLevel:boolean, courseDescription:string} = req.body;
    const newCourse = await CourseDao.create(courseTitle, courseCode, courseDepartment, isUpperLevel, courseDescription);
    res.status(200).json({ newCourse });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.get("/findOne/:id", async (req: any, res: any) => {
    const { id }: { id: number } = req.params;
    try {
        console.log('id: ' + id)
      const course = await CourseDao.readOne(id);
      if (!course) {
        return res.status(404).json({ msg: "Course not found" });
      }
      res.status(200).json({ course });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
  });

router.get("/all", async (req: any, res: any ) => {
  try {
    const courses = await CourseDao.readAll();
    res.status(200).json({ courses });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req: any, res: any) => {
    const id : number = req.params.id;
    const {courseTitle, courseCode, courseDepartment, isUpperLevel, courseDescription}: {courseTitle:string, courseCode:string, courseDepartment:string, isUpperLevel:boolean, courseDescription:string} = req.body;
    try {
        const course = await CourseDao.update( id, courseTitle, courseCode, courseDepartment, isUpperLevel, courseDescription );
        if (!course) {
        return res.status(404).json({ msg: "Course not found" });
        }
        res.status(200).json({ course });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

router.delete("/:id", async (req: any, res: any) => {
    const id : number = req.params.id;
    try {
        const course = await CourseDao.delete(id);
        if (!course) {
        return res.status(404).json({ msg: "Course not found" });
        }
        res.status(200).json({ course });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;