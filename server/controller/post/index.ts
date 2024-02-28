// server/controller/post/index.ts

export {}

const router = require('express').Router()

const Post = require('../../database/models/Post')

router.get('/', async (req: any, res: any) => {
    try {
        console.log('here...')
        const posts = await Post.find();
        res.send(posts)
    } catch (error) {
        console.error('Error retrieving posts:', error);
    }
});

router.post('/add', async (req: any, res: any) => {
    console.log('req.body:', req.body);
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

module.exports = router