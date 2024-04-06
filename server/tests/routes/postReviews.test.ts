export {}
const request = require('supertest');
const express = require('express');
const App = require('../../../server/app.ts')
const router = require('../../../server/routes/index.ts')
const PostReviewSchema = require('../../model/PostReview');
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

    // Test for GET /postReviews/getByPostId/:postId with empty database
    test('GET /postReviews/getByPostId/:postId with empty database', async () => {
        await PostReviewSchema.deleteMany({});

        const postId = '65f37b3c888c108c2bddff9f';

        const res = await request(app).get(`/postReviews/getByPostId/${postId}`);

        expect(res.status).toBe(404);
        expect(res.body.error).toBe('Post not found');
        await PostReviewSchema.deleteMany({});
    });

    
});
