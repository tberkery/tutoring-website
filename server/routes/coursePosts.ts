import exp from "constants";

const router = require('express').Router();
const CoursePostDaoClass = require('../data/CoursePostDao');
const CoursePostDao = new CoursePostDaoClass();

router.post("/", async (req: any, res: any) => {
  try {
    const {userId, userFirstName, userLastName, courseName, description, price, courseNumber, courseDepartment, gradeReceived, semesterTaken, professorTakenWith, takenAtHopkins, schoolTakenAt}: {userId: string, userFirstName: string, userLastName: string, courseName: string, description: string, price: number, courseNumber: string, courseDepartment: string[], gradeReceived: string, semesterTaken: string, professorTakenWith: string, takenAtHopkins: boolean, schoolTakenAt: string} = req.body
    const newPost = await CoursePostDao.create(userId, userFirstName, userLastName, courseName, takenAtHopkins, {description, price, courseNumber, courseDepartment, gradeReceived, semesterTaken, professorTakenWith, schoolTakenAt});
    res.status(201).json({ newPost });
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
  const {courseName, courseNumber, lowPrice, highPrice} = req.query;
  try {
    const posts = await CoursePostDao.readAll({courseName, courseNumber, lowPrice, highPrice});
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
    const {userId, userFirstName, userLastName, courseName, description, price, courseNumber, courseDepartment, gradeReceived, semesterTaken, professorTakenWith, takenAtHopkins, schoolTakenAt}: {userId: string, userFirstName: string, userLastName: string, courseName: string, description: string, price: number, courseNumber: string, courseDepartment: string[], gradeReceived: string, semesterTaken: string, professorTakenWith: string, takenAtHopkins: boolean, schoolTakenAt: string} = req.body;
    try {
        const post = await CoursePostDao.update( id, userId, userFirstName, userLastName, courseName, takenAtHopkins, {description, price, courseNumber, courseDepartment, gradeReceived, semesterTaken, professorTakenWith, schoolTakenAt} );
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

// Modify the route to include the functionality to compare prices
router.get("/comparePrice/:id", async (req: any, res: any) => {
  const { id }: { id: string } = req.params;
  try {
      const currentPost = await CoursePostDao.readOne(id);
      if (!currentPost) {
          return res.status(404).json({ msg: "Post not found" });
      }

      const { courseNumber } = currentPost;
      const coursePosts = await CoursePostDao.readAll({ courseNumber });

      let total = 0;
      for (const post of coursePosts) {
          total += post.price;
      }
      const meanPrice = total / coursePosts.length;

      const myPostPrice = currentPost.price

      let comparisonResult;
      let percentDiff;
      if (myPostPrice > meanPrice) {
        comparisonResult = "higher";
        percentDiff = (((myPostPrice - meanPrice) / meanPrice) * 100).toFixed(2);;
      } else if (myPostPrice < meanPrice) {
        comparisonResult = "lower";
        percentDiff = (((myPostPrice - meanPrice) / meanPrice) * 100).toFixed(2);;
      } else {
        comparisonResult = "same";
        percentDiff = 0;
      }

      res.status(200).json({ meanPrice, comparisonResult, myPostPrice, percentDiff});
  } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
  }
});

module.exports = router;