// server/controller/user/index.ts

export {}

const router = require('express').Router()

const Users = require('../../database/models/User')

router.get('/', async (req: any, res: any) => {
    try {
        const users = await Users.find();
        res.send(users)
    } catch (error) {
        console.error('Error fetching users:', error);
    }
});

router.post('/register', async (req: any, res: any) => {
    console.log('req.body:', req.body);
    try {
        const users = await Users.find();
        const largestIdUser = users.reduce((prev: any, current: any) => (prev.id > current.id) ? prev : current, { id: 0 });

        const newUser = new Users({
            id: largestIdUser.id + 1,
            username: req.body.username,
        });

        await newUser.save();
        res.send(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
    }
})



module.exports = router