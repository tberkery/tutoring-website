export {}
const request = require('supertest');
const express = require('express');
const App = require('../../../server/app.ts')
const router = require('../../../server/routes/index.ts')
const activityPost = require('../../../server/model/ActivityPost'); 
const coursePost = require('../../../server/model/CoursePost');
const { ObjectId } = require('mongodb');

App.dbConnection(true)
const app = App.app

const objectIdString = "65ee95b7aef7f7e6b98ca4e8";
const objectId = new ObjectId(objectIdString);

// Extracting the timestamp from the ObjectID
const timestamp = objectId.getTimestamp();

console.log(timestamp); // This will log the timestamp


app.use(express.json());
app.use('/allPosts', router);

async function addActivityWithDelay(postData: any) {
    await new Promise(resolve => setTimeout(resolve, 100)); // 1 second delay
    return request(app).post('/activityPosts').send(postData);
}

async function addCourseWithDelay(postData: any) {
    await new Promise(resolve => setTimeout(resolve, 100)); // 1 second delay
    return request(app).post('/coursePosts').send(postData);
}

describe('Test allPosts routes', () => {

    // Test for GET /allPosts with empty database
    test('GET /allPosts with empty database', async () => {
        await activityPost.deleteMany({});
        await coursePost.deleteMany({});

        const res = await request(app).get('/allPosts');
    
        expect(res.status).toBe(404);
        expect(res.body.msg).toBe("No posts found");
        await activityPost.deleteMany({});
        await coursePost.deleteMany({});
    });

    test('GET /allPosts with multiple course posts', async () => {

        const newCourseData1 = {
            userId: 'exampleUserId',
            userFirstName: 'Dokyung',
            userLastName: 'Yang',
            courseName: 'Example Course 108',
            description: 'Example description',
            imageUrl: 'exampleImageUrl',
            price: 1,
            courseNumber: 'AS.000.000',
            takenAtHopkins: true
        };

        const newCourseData2 = {
            userId: 'exampleUserId',
            userFirstName: 'Dokyung',
            userLastName: 'Yang',
            courseName: 'Example Course 107',
            description: 'Example description',
            imageUrl: 'exampleImageUrl',
            price: 1, 
            courseNumber: 'AS.000.001',
            takenAtHopkins: true
        };

        const newCourseData3 = {
            userId: 'exampleUserId',
            userFirstName: 'Dokyung',
            userLastName: 'Yang',
            courseName: 'Example Course 106',
            description: 'Example description',
            imageUrl: 'exampleImageUrl',
            price: 1, 
            courseNumber: 'AS.000.002',
            takenAtHopkins: true
        };

        const newCourseData4 = {
            userId: 'exampleUserId',
            userFirstName: 'Dokyung',
            userLastName: 'Yang',
            courseName: 'Example Course 105',
            description: 'Example description',
            imageUrl: 'exampleImageUrl',
            price: 1, 
            courseNumber: 'AS.000.002',
            takenAtHopkins: true
        };

        await activityPost.deleteMany({});
        await coursePost.deleteMany({});

        const firstPost = await addCourseWithDelay(newCourseData1);
        const secondPost = await addCourseWithDelay(newCourseData2);
        const thirdPost = await addCourseWithDelay(newCourseData3);

        // Fetch all posts
        const res = await request(app).get('/allPosts');

        expect(res.status).toBe(200);
        const timestamps = res.body.map((post: any) => new ObjectId(post._id).getTimestamp().getTime());
        expect(timestamps).toEqual(timestamps.sort((a: number, b: number) => b - a));
        await activityPost.deleteMany({});
        await coursePost.deleteMany({});
    });

    test('GET /allPosts with multiple activity posts', async () => {

        const newPostData1 = {
            userId: 'exampleUserId',
            activityTitle: 'Example Activity 108',
            activityDescription: 'Example description',
            imageUrl: 'exampleImageUrl',
            price: 1, 
            tags: ['exampleTag1', 'exampleTag2'],
            takenAtHopkins: true
        };

        const newPostData2 = {
            userId: 'exampleUserId',
            activityTitle: 'Example Activity 107',
            activityDescription: 'Example description',
            imageUrl: 'exampleImageUrl',
            price: 1, 
            tags: ['exampleTag1', 'exampleTag2'],
            takenAtHopkins: true
        };

        const newPostData3 = {
            userId: 'exampleUserId',
            activityTitle: 'Example Activity 106',
            activityDescription: 'Example description',
            imageUrl: 'exampleImageUrl',
            price: 1, 
            tags: ['exampleTag1', 'exampleTag2'],
            takenAtHopkins: true
        };

        const newPostData4 = {
            userId: 'exampleUserId',
            activityTitle: 'Example Activity 105',
            activityDescription: 'Example description',
            imageUrl: 'exampleImageUrl',
            price: 1, 
            tags: ['exampleTag1', 'exampleTag2'],
            takenAtHopkins: true
        };

        await activityPost.deleteMany({});
        await coursePost.deleteMany({});

        const firstPost = await addActivityWithDelay(newPostData1);
        const secondPost = await addActivityWithDelay(newPostData2);
        const thirdPost = await addActivityWithDelay(newPostData3);
        const fourthPost = await addActivityWithDelay(newPostData4);

        // Fetch all posts
        const res = await request(app).get('/allPosts');

        expect(res.status).toBe(200);
        const timestamps = res.body.map((post: any) => new ObjectId(post._id).getTimestamp().getTime());
        expect(timestamps).toEqual(timestamps.sort((a: number, b: number) => b - a));
        await activityPost.deleteMany({});
        await coursePost.deleteMany({});

    });

    test ('GET /allPosts with both activity and course posts', async () => {
            
            const newCourseData1 = {
                userId: 'exampleUserId',
                userFirstName: 'Dok',
                userLastName: 'Yang',
                courseName: 'Example Course 108',
                description: 'Example description',
                imageUrl: 'exampleImageUrl',
                price: 2, 
                takenAtHopkins: true
            };
    
            const newPostData1 = {
                userId: 'exampleUserId',
                activityTitle: 'Example Activity 108',
                activityDescription: 'Example description',
                imageUrl: 'exampleImageUrl',
                price: 2, 
                tags: ['exampleTag1', 'exampleTag2'],
                takenAtHopkins: true
            };

            const newCourseData2 = {
                userId: 'exampleUserId',
                userFirstName: 'Dok',
                userLastName: 'Yang',
                courseName: 'Example Course 107',
                description: 'Example description',
                imageUrl: 'exampleImageUrl',
                price: 2, 
                takenAtHopkins: true
            };

            const newPostData2 = {
                userId: 'exampleUserId',
                activityTitle: 'Example Activity 107',
                activityDescription: 'Example description',
                imageUrl: 'exampleImageUrl',
                price: 2, 
                tags: ['exampleTag1', 'exampleTag2'],
                takenAtHopkins: true
            };

    
            await activityPost.deleteMany({});
            await coursePost.deleteMany({});
    
            const firstCoursePost = await addCourseWithDelay(newCourseData1);
            const firstActivityPost = await addActivityWithDelay(newPostData1);
            const secondCoursePost = await addCourseWithDelay(newCourseData2);
            const secondActivityPost = await addActivityWithDelay(newPostData2);
    
            // Fetch all posts
            const res = await request(app).get('/allPosts');
    
            expect(res.status).toBe(200);
            const timestamps = res.body.map((post: any) => new ObjectId(post._id).getTimestamp().getTime());
            expect(timestamps).toEqual(timestamps.sort((a: number, b: number) => b - a));
            await activityPost.deleteMany({});
            await coursePost.deleteMany({});
    
    });

});