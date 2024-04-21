export {}
const request = require('supertest');
const express = require('express');
const App = require('../../../server/app.ts')
const router = require('../../../server/routes/index.ts')
const PostReviewSchema = require('../../model/PostReview');
const coursePost = require('../../../server/model/CoursePost'); 
const activityPost = require('../../../server/model/ActivityPost'); 
const { ObjectId } = require('mongodb');

App.dbConnection(true)
const app = App.app

describe('Test postReviews routes', () => {
    // Test for GET /postReviews/getByPostId/:postId with empty database
    test('GET /postReviews/getByPostId/:postId with empty database', async () => {
        await PostReviewSchema.deleteMany({});

        const postId = '65f37b3c888c108c2bddff9f';

        const res = await request(app).get(`/postReviews/getByPostId/${postId}`);

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('Post not found');
        await PostReviewSchema.deleteMany({});
    });

    // Test for DELETE /postReviews/:reviewId with a course post
    test('DELETE /postReviews/:reviewId with course post', async () => {

        // Create a post to get a valid post ID
        const newPostData = {
            userId: 'exampleUserId',
            userFirstName: 'Ilana',
            userLastName: 'Chalom',
            courseName: 'Intro to Example',
            description: 'Example description',
            price: 20,
            courseNumber: "AS.000.000",
            takenAtHopkins: true
        };

        const resPost = await request(app)
        .post('/coursePosts')
        .send(newPostData);

        // Extract the created post ID from the response
        const postId = resPost.body.newPost._id;

        // Create a test review
        const newReview = await PostReviewSchema.create({
            postId: postId,
            posterId: new ObjectId(),
            reviewerId: new ObjectId(),
            reviewDescription: 'Test review',
            rating: 5,
            isAnonymous: false
        });

        // Make a DELETE request to delete the review
        const resReview = await request(app).delete(`/postReviews/${newReview._id}`);

        // Check the response
        expect(resReview.status).toBe(200);
        expect(resReview.body.message).toBe('Review deleted successfully');
        expect(resReview.body.deletedReview._id).toBe(newReview._id.toString());

        // Check if the review was actually deleted from the database
        const deletedReview = await PostReviewSchema.findById(newReview._id);
        expect(deletedReview).toBeNull();

        await coursePost.deleteMany({});
    });

    // Test for DELETE /postReviews/:reviewId with an activity post
    test('DELETE /postReviews/:reviewId with activity post', async () => {

        // Create a post to get a valid post ID
        const newPostData = {
            userId: 'exampleUserId',
            userFirstName: 'Ilana',
            userLastName: 'Chalom',
            activityTitle: 'Example Activity',
            activityDescription: 'Example description',
            activityPostPicKey: 'exampleactivityPostPicKey',
            price: 1,
            tags: ['exampleTag1', 'exampleTag2']
        };

        const resPost = await request(app)
        .post('/activityPosts')
        .send(newPostData);

        // Extract the created post ID from the response
        const postId = resPost.body.newPost._id;

        // Create a test review
        const newReview = await PostReviewSchema.create({
            postId: postId,
            posterId: new ObjectId(),
            reviewerId: new ObjectId(),
            reviewDescription: 'Test review',
            rating: 5,
            isAnonymous: false
        });

        // Make a DELETE request to delete the review
        const resReview = await request(app).delete(`/postReviews/${newReview._id}`);

        // Check the response
        expect(resReview.status).toBe(200);
        expect(resReview.body.message).toBe('Review deleted successfully');
        expect(resReview.body.deletedReview._id).toBe(newReview._id.toString());

        // Check if the review was actually deleted from the database
        const deletedReview = await PostReviewSchema.findById(newReview._id);
        expect(deletedReview).toBeNull();

        await activityPost.deleteMany({});
    });

    // Test for DELETE /postReviews/:reviewId when review does not exist
    test('DELETE /postReviews/:reviewId when review does not exist', async () => {
        // Make a DELETE request with a non-existent review ID
        const res = await request(app).delete(`/postReviews/${new ObjectId()}`);

        // Check the response
        expect(res.status).toBe(404);
        expect(res.body.error).toBe('Review not found');
    });

    afterAll(async () => {
        await App.close(); // Close the MongoDB connection
    });
    
});
