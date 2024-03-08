import exp from "constants";

const router = require('express').Router();
const ActivityPostDaoClass = require('../data/ActivityPostDao');
const ActivityPostDao = new ActivityPostDaoClass();

router.post("/", async (req: any, res: any) => {
  try {
    const {userId, activityTitle, activityDescription, imageUrl, price, tags}: {userId: string, activityTitle: string, activityDescription: string, imageUrl: string, price: string, tags: [String]} = req.body
    console.log("IN ROUTES");
    const newPost = await ActivityPostDao.create(userId, activityTitle, {activityDescription, imageUrl, price, tags});
    res.status(201).json({ newPost });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.get("/findOne/:id", async (req: any, res: any) => {
    const { id }: { id: number } = req.params;
    try {
      const post = await ActivityPostDao.readOne(id);
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
      res.status(200).json({ post });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

router.get("/", async (req: any, res: any ) => {
  try {
    const posts = await ActivityPostDao.readAll();
    if (!posts) {
      return res.status(404).json({ msg: "No posts found" });
    }
    res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req: any, res: any) => {
    const id : number = req.params.id;
    const postInfo = req.body;
    try {
        const post = await ActivityPostDao.update( id, postInfo );
        if (!post) {
        return res.status(404).json({ msg: "Post not found" });
        }
        res.status(200).json({ post });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

router.delete("/:id", async (req: any, res: any) => {
    const id : number = req.params.id;
    try {
        const post = await ActivityPostDao.delete(id);
        if (!post) {
        return res.status(404).json({ msg: "Post not found" });
        }
        res.status(200).json({ msg: "Post deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;