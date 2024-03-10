export {}
const request = require('supertest');
const express = require('express');
const app = require('../../../server/app.ts')
const router = require('../../../server/routes/index.ts')
const activityPost = require('../../../server/model/ActivityPost'); 

app.use(express.json());
app.use('/activityPosts', router);

describe('Test activityPosts routes', () => {
    test('POST /activityPosts', async () => {
        // Create a post to get a valid post ID
        const newPostData = {
            userId: 'exampleUserId',
            activityTitle: 'Example Activity',
            activityDescription: 'Example description',
            imageUrl: 'exampleImageUrl',
            price: 'examplePrice',
            tags: ['exampleTag1', 'exampleTag2']
        };

        const res = await request(app)
        .post('/activityPosts')
        .send(newPostData);

        // Extract the created post ID from the response
        const postId = res.body.newPost._id;
      
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('newPost');

        // Clean up: Delete the post created during the test
        await request(app).delete(`/activityPosts/${postId}`);
    });

  
    // Test for GET /activityPosts/:id
    test('GET /activityPosts/findOne/:id', async () => {
        const newPostData = {
            userId: 'exampleUserId',
            activityTitle: 'Example Activity',
            activityDescription: 'Example description',
            imageUrl: 'exampleImageUrl',
            price: 'examplePrice',
            tags: ['exampleTag1', 'exampleTag2']
        };
        
        // Make a POST request to create the post
        const postRes = await request(app).post('/activityPosts').send(newPostData);
    
        // Extract the created post ID from the response
        const postId = postRes.body.newPost._id;

        const res = await request(app).get(`/activityPosts/findOne/${postId}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('post');
        expect(res.body.post).toEqual(expect.objectContaining({
            ...newPostData,
            tags: expect.any(Array) // Assert that 'tags' is an array
        }));

        // Clean up: Delete the post created during the test
        await request(app).delete(`/activityPosts/${postId}`);
    });
    
    // Test for GET /activityPosts with empty database
    test('GET /activityPosts with empty database', async () => {
        await activityPost.deleteMany({});

        const res = await request(app).get('/activityPosts');
    
        expect(res.status).toBe(404);
        expect(res.body.msg).toBe("No posts found");
    });

    // Test for GET /activityPosts with multiple posts in the database
    test('GET /activityPosts with multiple posts', async () => {
        await activityPost.deleteMany({});

        const example1PostData = {
            userId: 'example1UserId',
            activityTitle: 'Example1 Activity',
            activityDescription: 'Example1 description',
            imageUrl: 'example1ImageUrl',
            price: 'example1Price',
            tags: ['example1Tag1', 'example1Tag2']
        };

        const example2PostData = {
            userId: 'example2UserId',
            activityTitle: 'Example2 Activity',
            activityDescription: 'Example2 description',
            imageUrl: 'example2ImageUrl',
            price: 'example2Price',
            tags: ['example2Tag1', 'example2Tag2']
        };
        
        // Make a POST request to create the post
        const postRes1 = await request(app).post('/activityPosts').send(example1PostData);
        
        // Make a POST request to create the post
        const postRes2 = await request(app).post('/activityPosts').send(example2PostData);

        const res = await request(app).get('/activityPosts');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('posts');
        expect(res.body.posts).toHaveLength(2);

        // Iterate over each post and delete it
        for (const post of res.body.posts) {
            const postId = post._id;
            await request(app).delete(`/activityPosts/${postId}`);
        }
    });

    // Test for PUT /activityPosts/:id
    test('PUT /activityPosts/:id', async () => {
        const newPostData = {
            userId: 'exampleUserId',
            activityTitle: 'Example Activity',
            activityDescription: 'Example description',
            imageUrl: 'exampleImageUrl',
            price: 'examplePrice',
            tags: ['exampleTag1', 'exampleTag2']
        };
        
        // Make a POST request to create the post
        const postRes = await request(app).post('/activityPosts').send(newPostData);

        // Extract the created post ID from the response
        const postId = postRes.body.newPost._id;
    
        const updatedData = {
            activityTitle: 'Updated Title',
            activityDescription: 'Updated Description'
        };

        const finalPostData = {
            userId: 'exampleUserId',
            activityTitle: 'Updated Title',
            activityDescription: 'Updated Description',
            imageUrl: 'exampleImageUrl',
            price: 'examplePrice',
            tags: ['exampleTag1', 'exampleTag2']
        };
    
        const res = await request(app)
        .put(`/activityPosts/${postId}`)
        .send(updatedData);
    
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('post');
        expect(res.body.post).toEqual(expect.objectContaining({
            ...finalPostData,
            tags: expect.any(Array) // Assert that 'tags' is an array... need to tell Jest this
        }));

        // Clean up: Delete the post created during the test
        await request(app).delete(`/activityPosts/${postId}`);
    });

    // Test for DELETE /activityPosts/:id
    test('DELETE /activityPosts/:id', async () => {
        const newPostData = {
            userId: 'exampleUserId',
            activityTitle: 'Example Activity',
            activityDescription: 'Example description',
            imageUrl: 'exampleImageUrl',
            price: 'examplePrice',
            tags: ['exampleTag1', 'exampleTag2']
        };
        
        // Make a POST request to create the post
        const postRes = await request(app).post('/activityPosts').send(newPostData);

        // Extract the created post ID from the response
        const postId = postRes.body.newPost._id;
    
        const res = await request(app).delete(`/activityPosts/${postId}`);
    
        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Post deleted successfully");
    });

    // Test for GET with simple query by userId
    test('GET /activityPosts/query for simple, one-field query', async () => {
        // Clear all existing activity posts
        await activityPost.deleteMany({});
    
        // Create example data for activity posts
        const example1PostData = {
            userId: 'example1UserId',
            activityTitle: 'Example1 Activity',
            activityDescription: 'Example1 description',
            imageUrl: 'example1ImageUrl',
            price: 'example1Price',
            tags: ['example1Tag1', 'example1Tag2']
        };
    
        const example2PostData = {
            userId: 'example2UserId',
            activityTitle: 'Example2 Activity',
            activityDescription: 'Example2 description',
            imageUrl: 'example2ImageUrl',
            price: 'example2Price',
            tags: ['example2Tag1', 'example2Tag2']
        };
        
        // Make POST requests to create the posts
        const postRes1 = await request(app).post('/activityPosts').send(example1PostData);
        const postRes2 = await request(app).post('/activityPosts').send(example2PostData);
    
        // Make a GET request to query activity posts by userId
        const res = await request(app).get('/activityPosts/query?userId=example2UserId');
    
        // Assertions
        expect(res.status).toBe(200);
        console.log("HERE IS RES.BODY:")
        console.log(res.body[0]);
        expect(res.body).toEqual(example2PostData); // Check if the returned post matches example2PostData
    
        // Clean up: Delete all activity posts
        await activityPost.deleteMany({});
    });
    
    // Test for GET with complex query featuring all queryable fields

    // Test for GET with query of multiple but not all fields
});