import exp from "constants";

const router = require('express').Router();
const ProfileDaoClass = require('../data/ProfileDao');
const ProfileDao = new ProfileDaoClass();

const ActivityPostDaoClass = require('../data/ActivityPostDao');
const ActivityPostDao = new ActivityPostDaoClass();

const CoursePostDaoClass = require('../data/CoursePostDao');
const CoursePostDao = new CoursePostDaoClass();

const PostReviewDaoClass = require('../data/PostReviewDao');
const PostReviewDao = new PostReviewDaoClass();

router.get('/getByProfileId/:profileId', async (req: any, res: any) => {
    try {
        // Fetch the profile by ID
        const profile = await ProfileDao.readById(req.params.profileId);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

       // Extract posts from the fetched profile
       const posts = profile.posts;

       // Extract reviews for each post
       const reviewsPromises = posts.map(async (post: any) => {
           // Fetch the reviews associated with the current post
           const reviews = await PostReviewDao.readAllByPostId(post._id);

           // Extract only the review objects from the reviews array
           return reviews.map((review: { toObject: () => any; }) => review.toObject());
       });

       // Wait for all reviews promises to resolve
       const reviewsArrays = await Promise.all(reviewsPromises);

       // Merge all reviews arrays into a single array
       const allReviews = reviewsArrays.reduce((acc, reviews) => [...acc, ...reviews], []);

       // Send the combined data as a single response
       res.json({ posts, reviews: allReviews });

    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/getByPostId/:postId', async (req: any, res: any) => {
    try {
        // Fetch the post by ID
        let post = await ActivityPostDao.readOne(req.params.postId);
         if (!post) {
            // If the activity post is not found, try fetching the course post
            post = await CoursePostDao.readOne(req.params.postId);
            if (!post) {
                // If neither activity nor course post is found, return a 404 error
                return res.status(404).json({ error: 'Post not found' });
            }
        }

        // Fetch the reviews associated with the current post
        const reviews = await PostReviewDao.readAllByPostId(post._id);

        // Send the reviews as a response
        res.json({reviews});

    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;