import exp from "constants";

const router = require('express').Router();
const PostDaoClass = require('../data/PostDao');
const PostDao = new PostDaoClass();

router.post("/", async (req: any, res: any) => {
  try {
    const {userId, title, description, imageUrl, price, courseId}: {userId: string, title: string, description: string, imageUrl: string, price: string, courseId: Number} = req.body
    console.log("IN ROUTES");
    const newPost = await PostDao.create(userId, title, {description, imageUrl, price, courseId});
    res.status(200).json({ newPost });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.get("/findOne/:id", async (req: any, res: any) => {
    const { id }: { id: number } = req.params;
    try {
      const post = await PostDao.readOne(id);
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
    const posts = await PostDao.readAll();
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
        const post = await PostDao.update( id, postInfo );
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
        const post = await PostDao.delete(id);
        if (!post) {
        return res.status(404).json({ msg: "Post not found" });
        }
        res.status(200).json({ post });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;