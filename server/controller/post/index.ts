// server/controller/post/index.ts

export {}

const router = require('express').Router()

// findAll
const Post = require('../../database/models/Post')

router.get('/', async (req: any, res: any) => {
    try {
        const posts = await Post.find();
        res.send(posts)
    } catch (error) {
        console.error('Error retrieving posts:', error);
    }
});

// find by userId
router.get('/:userId', async (req: any, res: any) => {
    try {
        const posts = await Post.find({ userId: req.params.userId });
        res.send(posts)
    } catch (error) {
        console.error('Error retrieving posts:', error);
    }
})

// create
router.post('/', async (req: any, res: any) => {
    try {
        const posts = await Post.find();
        const largestIdPost = posts.reduce((prev: any, current: any) => (prev.id > current.id) ? prev : current, { id: 20000 });

        const newPost = new Post({
            id: largestIdPost.id + 1,
            ...req.body
        });

        await newPost.save();
        res.send(newPost);
    } catch (error) {
        console.error('Error adding post: ', error);
    }
})

// update
router.put('/:id', async (req: any, res: any) => {
    try {
        let post = await Post.findOne({ id: req.params.id });
        if (!post) {
            return res.status(404).send('Post not found');
        }
        post.set(req.body);
        await post.save();
        res.send(post);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).send('Internal Server Error');
    }
})

// delete
router.delete('/:id', async (req: any, res: any) => {
    try {
        await Post.findOneAndDelete({ id: req.params.id });
        res.send('Post deleted');
    } catch (error) {
        console.error('Error deleting post:', error);
    }
})

module.exports = router