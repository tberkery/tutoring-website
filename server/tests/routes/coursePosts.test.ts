export {}
const request = require('supertest');
const express = require('express');
const router = require('../../../server/routes/index.ts')
const coursePost = require('../../../server/model/CoursePost'); 
const App = require('../../../server/app.ts')

App.dbConnection(true)
const app = App.app

app.use(express.json());
app.use('/coursePosts', router);

describe('Test coursePosts routes', () => {
    test('POST /coursePosts', async () => {
        // Create a post to get a valid post ID
        const newPostData = {
            userId: 'exampleUserId',
            courseName: 'Intro to Example',
            description: 'Example description',
            price: 20,
            courseNumber: "AS.000.000",
            takenAtHopkins: true
        };

        const res = await request(app)
        .post('/coursePosts')
        .send(newPostData);

        // Extract the created post ID from the response
        const postId = res.body.newPost._id;
      
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('newPost');

        // Clean up: Delete the post created during the test
        await request(app).delete(`/coursePosts/${postId}`);
    });

  
    // Test for GET /coursePosts/:id
    test('GET /coursePosts/findOne/:id', async () => {
        const newPostData = {
            userId: 'exampleUserId',
            courseName: 'Intro to Example',
            description: 'Example description',
            price: 20,
            courseNumber: "AS.000.000",
            takenAtHopkins: true
        };

        const res = await request(app)
        .post('/coursePosts')
        .send(newPostData);
    
        // Extract the created post ID from the response
        const postId = res.body.newPost._id;

        const getRes = await request(app).get(`/coursePosts/findOne/${postId}`);

        expect(getRes.status).toBe(200);
        expect(getRes.body).toHaveProperty('post');
        expect(getRes.body.post).toEqual(expect.objectContaining({
            ...newPostData,
            // tags: expect.any(Array) // Assert that 'tags' is an array
        }));

        // Clean up: Delete the post created during the test
        await request(app).delete(`/coursePosts/${postId}`);
    });
    
    // Test for GET /coursePosts with empty database
    test('GET /coursePosts with empty database', async () => {
        await coursePost.deleteMany({});

        const res = await request(app).get('/coursePosts');
    
        expect(res.status).toBe(200);
    });

    // Test for GET /coursePosts with multiple posts in the database
    test('GET /coursePosts with multiple posts', async () => {
        await coursePost.deleteMany({});

        const newPost1Data = {
            userId: 'example1UserId',
            courseName: 'Intro to Example1',
            description: 'Example description1',
            price: 20,
            courseNumber: "AS.000.001",
            takenAtHopkins: true
        };

        const newPost2Data = {
            userId: 'example2UserId',
            courseName: 'Intro to Example2',
            description: 'Example description2',
            price: 22,
            courseNumber: "AS.000.002",
            takenAtHopkins: true
        };
        
        // Make a POST request to create the post
        const postRes1 = await request(app).post('/coursePosts').send(newPost1Data);
        
        // Make a POST request to create the post
        const postRes2 = await request(app).post('/coursePosts').send(newPost2Data);

        const res = await request(app).get('/coursePosts');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('posts');
        expect(res.body.posts).toHaveLength(2);

        // Iterate over each post and delete it
        for (const post of res.body.posts) {
            const postId = post._id;
            await request(app).delete(`/coursePosts/${postId}`);
        }
    });

    // Test for PUT /coursePosts/:id
    test('PUT /coursePosts/:id', async () => {
        const newPostData = {
            userId: 'exampleUserId',
            courseName: 'Intro to Example',
            description: 'Example description',
            price: 20,
            courseNumber: "AS.000.000",
            takenAtHopkins: true

        };
        
        // Make a POST request to create the post
        const postRes = await request(app).post('/coursePosts').send(newPostData);

        // Extract the created post ID from the response
        const postId = postRes.body.newPost._id;
    
        const updatedData = {
            price: 25,
            description: 'Updated Description'
        };

        const finalPostData = {
            userId: 'exampleUserId',
            courseName: 'Intro to Example',
            description: 'Updated Description',
            price: 25,
            courseNumber: "AS.000.000",
            takenAtHopkins: true
        };
    
        const res = await request(app)
        .put(`/coursePosts/${postId}`)
        .send(updatedData);
        expect(res.status).toBe(200);

        const res2 = await request(app).get(`/coursePosts/findOne/${postId}`)
        expect(res2.status).toBe(200);
        expect(res2.body).toHaveProperty('post');
        expect(res2.body.post).toEqual(expect.objectContaining({
            ...finalPostData
        }));

        // Clean up: Delete the post created during the test
        await request(app).delete(`/coursePosts/${postId}`);
    });

    // Test for DELETE /coursePosts/:id
    test('DELETE /coursePosts/:id', async () => {
        const newPostData = {
            userId: 'exampleUserId',
            courseName: 'Intro to Example',
            description: 'Example description',
            price: 20,
            courseNumber: "AS.000.000",
            takenAtHopkins: true
        };
        
        // Make a POST request to create the post
        const postRes = await request(app).post('/coursePosts').send(newPostData);

        // Extract the created post ID from the response
        const postId = postRes.body.newPost._id;
    
        const res = await request(app).delete(`/coursePosts/${postId}`);
    
        expect(res.status).toBe(200);
    });

    // Test for GET with simple query 
    test('GET /coursePost/query for simple, one-field query', async () => {
        // Clear all existing course posts
        await coursePost.deleteMany({});
    
        // Create example data for course posts
        const example1PostData = {
            userId: 'exampleUserId',
            courseName: 'Intro to Example',
            description: 'Example description',
            price: 20,
            courseNumber: "AS.000.000",
            takenAtHopkins: true
        };
    
        const example2PostData = {
            userId: 'exampleUserId2',
            courseName: 'Intro to Example2',
            description: 'Example description2',
            price: 30,
            courseNumber: "AS.000.002",
            takenAtHopkins: true
        };
        
        // Make POST requests to create the posts
        const postRes1 = await request(app).post('/coursePosts').send(example1PostData);
        const postRes2 = await request(app).post('/coursePosts').send(example2PostData);
    
        const res = await request(app).get('/coursePosts/?courseName=Intro to Example2');
    
        // Assertions
        expect(res.status).toBe(200);
        expect(res.body.posts).toHaveLength(1); // Ensure only one post is returned
        expect(res.body.posts[0]).toMatchObject(example2PostData); // Verify it matches contents of post that satisifes query

        // Clean up: Delete all course posts
        await coursePost.deleteMany({});
    });
    
    // Test for GET with query featuring multiple but not all fields for single-post right answer.
    test('GET /coursePosts/query with query featuring multiple but not all fields for single-post right answer', async () => {
        // Clear all existing course posts
        await coursePost.deleteMany({});
    
        const example1PostData = {
            userId: 'exampleUserId',
            courseName: 'Intro to Example',
            description: 'Example description',
            price: 20,
            courseNumber: "AS.000.000",
            takenAtHopkins: true
        };
    
        const example2PostData = {
            userId: 'exampleUserId2',
            courseName: 'Intro to Example2',
            description: 'Example description2',
            price: 30,
            courseNumber: "AS.000.002",
            takenAtHopkins: true
        };
        
        // Make POST requests to create the posts
        const postRes1 = await request(app).post('/coursePosts').send(example1PostData);
        const postRes2 = await request(app).post('/coursePosts').send(example2PostData);
    
        const res = await request(app).get('/coursePosts/?courseNumber=AS.000.002&lowPrice=20&highPrice=40');
    
        // Assertions
        expect(res.status).toBe(200);
        expect(res.body.posts).toHaveLength(1); // Ensure only one post is returned
        expect(res.body.posts[0]).toMatchObject(example2PostData); // Verify it matches contents of post that satisifes query

        // Clean up: Delete all course posts
        await coursePost.deleteMany({});
    });

    // Test for GET with query for courseName
    test('GET /coursePosts/query with a focus on courseName', async () => {
        // Clear all existing course posts
        await coursePost.deleteMany({});
    
        // Create example data for course posts
        const example1PostData = {
            userId: 'exampleUserId',
            courseName: 'Intro to Example',
            description: 'Example description',
            price: 20,
            courseNumber: "AS.000.000",
            takenAtHopkins: true
        };
    
        const example2PostData = {
            userId: 'exampleUserId2',
            courseName: 'Intro to Example',
            description: 'Example description',
            price: 30,
            courseNumber: "AS.000.000",
            takenAtHopkins: true
        };

        const example3PostData = { 
            userId: 'exampleUserId3',
            courseName: 'Intro to Example2',
            description: 'Example description',
            price: 15,
            courseNumber: "AS.000.002",
            takenAtHopkins: true
        };
        
        // Make POST requests to create the posts
        const postRes1 = await request(app).post('/coursePosts').send(example1PostData);
        const postRes2 = await request(app).post('/coursePosts').send(example2PostData);
        const postRes3 = await request(app).post('/coursePosts').send(example3PostData);

        const res = await request(app).get('/coursePosts/?courseName=Intro to Example');
        
        // Assertions
        expect(res.status).toBe(200);
        expect(res.body.posts).toHaveLength(3); 
        // Remark: assumes (tolerably right now but perhaps not in time) that return order will be the same as creation order.
        expect(res.body.posts[0]).toMatchObject(example1PostData); // Verify it matches contents of post that satisifes query
        expect(res.body.posts[1]).toMatchObject(example2PostData); // Verify it matches contents of post that satisifes query
        // Clean up: Delete all course posts
        await coursePost.deleteMany({});
    });

    // Test for GET with query for price
    test('GET /coursePosts/query with a focus on price', async () => {
        // Clear all existing course posts
        await coursePost.deleteMany({});
    
        // Create example data for course posts
        const example1PostData = {
            userId: 'exampleUserId',
            courseName: 'Intro to Example',
            description: 'Example description',
            price: 20,
            courseNumber: "AS.000.000",
            takenAtHopkins: true
        };
    
        const example2PostData = {
            userId: 'exampleUserId2',
            courseName: 'Intro to Example2',
            description: 'Example description2',
            price: 20,
            courseNumber: "AS.000.002",
            takenAtHopkins: true
        };

        const example3PostData = { 
            userId: 'exampleUserId3',
            courseName: 'Intro to Example3',
            description: 'Example description3',
            price: 30,
            courseNumber: "AS.000.003",
            takenAtHopkins: true
        };

        const example4PostData = { 
            userId: 'exampleUserId4',
            courseName: 'Intro to Example4',
            description: 'Example description4',
            price: 10,
            courseNumber: "AS.000.004",
            takenAtHopkins: true
        };
        
        // Make POST requests to create the posts
        const postRes1 = await request(app).post('/coursePosts').send(example1PostData);
        const postRes2 = await request(app).post('/coursePosts').send(example2PostData);
        const postRes3 = await request(app).post('/coursePosts').send(example3PostData);
        const postRes4 = await request(app).post('/coursePosts').send(example4PostData);

        const res = await request(app).get('/coursePosts/?lowPrice=20');
    
        // Assertions
        expect(res.status).toBe(200);
        expect(res.body.posts).toHaveLength(2); 

        expect(res.body.posts[0]).toMatchObject(example1PostData); 
        expect(res.body.posts[1]).toMatchObject(example2PostData); 

        const res2 = await request(app).get('/coursePosts/?lowPrice=20&highPrice=30');
        expect(res2.status).toBe(200);
        expect(res2.body.posts).toHaveLength(3); 

        // Clean up: Delete all course posts
        await coursePost.deleteMany({});
    });
}); 