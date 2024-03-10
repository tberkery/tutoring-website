import exp from "constants";

const router = require('express').Router();

const ActivityPostDaoClass = require('../data/ActivityPostDao');
const ActivityPostDao = new ActivityPostDaoClass();

const CoursePostDaoClass = require('../data/CoursePostDao');
const CoursePostDao = new CoursePostDaoClass();


router.get("/", async (req: any, res: any ) => {
    try {
        const coursePosts = await CoursePostDao.readAll({});
        const activityPosts = await ActivityPostDao.readAll({});
        
        const allPosts = [...coursePosts, ...activityPosts];
        
        allPosts.sort((a, b) => {
            const timestampA = a._id.getTimestamp().getTime();
            const timestampB = b._id.getTimestamp().getTime();
            return timestampB - timestampA; 
        });

        allPosts.forEach((post: any) => {
            console.log('time: ' + post._id.getTimestamp());
        })

        if (allPosts.length === 0) {
            return res.status(404).json({ msg: "No posts found" });
        }
                res.status(200).json(allPosts);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
