export {}
const request = require('supertest');
const express = require('express');
const router = require('../../../server/routes/index.ts')
const activityPost = require('../../../server/model/ActivityPost'); 
const App = require('../../../server/app.ts')

App.dbConnection(true)
const app = App.app

app.use(express.json());
app.use('/profiles', router);

describe('Test analytics reporting capabilities', () => {
    test('GET /profiles/demographics/:_id', async () => {
        
        const profile1Info = {
            "firstName": "Tad",
            "lastName": "Berkery",
            "email": "tberker2@jhu.edu",
            "affiliation": "Student",
            "graduationYear": 2024,
            "department": "Computer Science",
            "description": "I'm a member of the JHU Class of 2024"
        }

        const res = await request(app)
            .post('/profiles')
            .send(profile1Info);

        console.log(res.body)
        // Extract the created post ID from the response
        const profileId = res.body.data._id;

        // Clean up: Delete the post created during the test
        await request(app).delete(`/profiles/${profileId}`);
    });
});