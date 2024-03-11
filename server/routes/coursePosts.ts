import exp from "constants";

const router = require('express').Router();
const CoursePostDaoClass = require('../data/CoursePostDao');
const CoursePostDao = new CoursePostDaoClass();

router.post("/", async (req: any, res: any) => {
  try {
    const {userId, courseName, description, price, courseNumber, courseDepartment, gradeReceived, semesterTaken, professorTakenWith, takenAtHopkins, schoolTakenAt}: {userId: string, courseName: string, description: string, price: number, courseNumber: string, courseDepartment: string[], gradeReceived: string, semesterTaken: string, professorTakenWith: string, takenAtHopkins: boolean, schoolTakenAt: string} = req.body
    const newPost = await CoursePostDao.create(userId, courseName, {description, price, courseNumber, courseDepartment, gradeReceived, semesterTaken, professorTakenWith, takenAtHopkins, schoolTakenAt});
    res.status(200).json({ newPost });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/findOne/:id", async (req: any, res: any) => {
    const { id }: { id: string } = req.params;
    try {
      const post = await CoursePostDao.readOne(id);
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
      res.status(200).json({ post });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.get("/", async (req: any, res: any ) => {
  const {courseName, courseNumber, price} = req.query;
  try {
    const posts = await CoursePostDao.readAll({courseName, courseNumber, price});
    res.status(200).json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/findAllByUserId/:userId", async (req: any, res: any ) => {
  const {userId} = req.params;
  try {
    const posts = await CoursePostDao.readAllByUser(userId);
    res.status(200).json({ posts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req: any, res: any) => {
    const id : number = req.params.id;
    const {userId, courseName, description, price, courseNumber, courseDepartment, gradeReceived, semesterTaken, professorTakenWith, takenAtHopkins, schoolTakenAt}: {userId: string, courseName: string, description: string, price: number, courseNumber: string, courseDepartment: string[], gradeReceived: string, semesterTaken: string, professorTakenWith: string, takenAtHopkins: boolean, schoolTakenAt: string} = req.body;
    try {
        const post = await CoursePostDao.update( id, userId, courseName, {description, price, courseNumber, courseDepartment, gradeReceived, semesterTaken, professorTakenWith, takenAtHopkins, schoolTakenAt} );
        if (!post) {
        return res.status(404).json({ msg: "Post not found" });
        }
        res.status(200).json({ post });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.delete("/:id", async (req: any, res: any) => {
    const id : number = req.params.id;
    try {
        const post = await CoursePostDao.delete(id);
        if (!post) {
        return res.status(404).json({ msg: "Post not found" });
        }
        res.status(200).json({ post });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;