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
        const user = new Users(req.body);
        await user.save();
        res.send(user);
    } catch (error) {
        console.error('Error registering user:', error);
    }
})

module.exports = router