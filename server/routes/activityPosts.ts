import exp from "constants";

const router = require('express').Router();
const ActivityPostDaoClass = require('../data/ActivityPostDao');
const ActivityPostDao = new ActivityPostDaoClass();

router.post("/", async (req: any, res: any) => {
  try {
    const {userId, title, description, imageUrl, price, tags}: {userId: string, title: string, description: string, imageUrl: string, price: string, tags: [String]} = req.body
    console.log("IN ROUTES");
    const newPost = await ActivityPostDao.create(userId, title, {description, imageUrl, price, tags});
    res.status(200).json({ newPost });
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
        res.status(200).json({ post });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;