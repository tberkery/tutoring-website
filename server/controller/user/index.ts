// server/controller/user/index.ts

export {}
const router = require('express').Router()

const Users = require('../../database/models/User')

// TESTED get all users, mostly for dev purposes
router.get('/', async (req: any, res: any) => {
    try {
        const users = await Users.find();
        res.send(users)
    } catch (error) {
        console.error('Error fetching users:', error);
    }
});

// TESTED register (create) a new user, for Clerk Auth
router.post('/register', async (req: any, res: any) => {
    console.log('req.body:', req.body);
    try {
        const users = await Users.find();
        const largestIdUser = users.reduce((prev: any, current: any) => (prev.id > current.id) ? prev : current, { id: 0 });

        const newUser = new Users({
            id: largestIdUser.id + 1,
            ...req.body
        });

        await newUser.save();
        res.send(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
    }
})

// TESTED updating a user profile
router.put('/:id', async (req: any, res: any) => {
    try {
        let user = await Users.findOne({ id: req.params.id });
        if (!user) {
            return res.status(404).send('User not found');
        }
        user.set(req.body);
        await user.save();
        res.send(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
});

// TESTED deleting a user profile
router.delete('/:id', async (req: any, res: any) => {
    try {
        await Users.findOneAndDelete({ id: req.params.id });
        res.send('User deleted');
    } catch (error) {
        console.error('Error deleting user:', error);
    }
});



module.exports = router