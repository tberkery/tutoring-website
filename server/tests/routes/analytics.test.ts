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
    test('GET /profiles/demographics/:_id with no views of profile _id', async () => {
        
        const profile1Info = {
            "firstName": "Tad",
            "lastName": "Berkery",
            "email": "tberker2@jhu.edu",
            "affiliation": "Student",
            "graduationYear": 2024,
            "department": "Computer Science",
            "description": "I'm a member of the JHU Class of 2024"
        }

        const profile2Info = {
            "firstName": "Kat",
            "lastName": "Forbes",
            "email": "kforbes6@jhu.edu",
            "affiliation": "Student",
            "graduationYear": 2023,
            "department": "Computer Science",
            "description": "I'm a member of the JHU Class of 2023"
        }

        const res1 = await request(app)
            .post('/profiles')
            .send(profile1Info);

        const res2 = await request(app)
            .post('/profiles')
            .send(profile2Info);

        // Extract the created post ID from the response
        const profile1Id = res1.body.data._id;
        const profile2Id = res2.body.data._id;

        const resAnalytics = await request(app)
            .get(`/profiles/demographics/${profile1Id}`)

        expect(resAnalytics.body.departments).toMatchObject([]);
        expect(resAnalytics.body.affiliations).toMatchObject([]);
        expect(resAnalytics.body.graduationYears).toMatchObject([]);

        console.log(resAnalytics.body)

        // Clean up: Delete the post created during the test
        await request(app).delete(`/profiles/${profile1Id}`);
        await request(app).delete(`/profiles/${profile2Id}`);
    });

    test('GET /profiles/demographics/:_id with single view of profile _id', async () => {
        
        const profile1Info = {
            "firstName": "Tad",
            "lastName": "Berkery",
            "email": "tberker2@jhu.edu",
            "affiliation": "Student",
            "graduationYear": 2024,
            "department": "Computer Science",
            "description": "I'm a member of the JHU Class of 2024"
        }

        const profile2Info = {
            "firstName": "Kat",
            "lastName": "Forbes",
            "email": "kforbes6@jhu.edu",
            "affiliation": "Student",
            "graduationYear": 2023,
            "department": "Computer Science",
            "description": "I'm a member of the JHU Class of 2023"
        }

        const res1 = await request(app)
            .post('/profiles')
            .send(profile1Info);

        const res2 = await request(app)
            .post('/profiles')
            .send(profile2Info);

        // Extract the created post ID from the response
        const profile1Id = res1.body.data._id;
        const profile2Id = res2.body.data._id;

        const viewInfo = {
            "viewerId": profile2Id,
            "start_time": "2022-02-17T13:36:45.954Z",
            "duration": 120
        }

        const resView = await request(app)
            .put(`/profiles/views/${profile1Id}`)
            .send(viewInfo)

        console.log(resView);

        const resAnalytics = await request(app)
            .get(`/profiles/demographics/${profile1Id}`)

        expect(resAnalytics.body.departments).toHaveLength(1);
        expect(resAnalytics.body.affiliations).toHaveLength(1);
        expect(resAnalytics.body.graduationYears).toHaveLength(1);

        const computerScienceDepartment = resAnalytics.body.departments.find((department: { _id: string; }) => department._id === 'Computer Science');
        expect(computerScienceDepartment).toBeDefined();
        expect(computerScienceDepartment.count).toBe(1);

        const affiliationStudent = resAnalytics.body.affiliations.find((affiliation: { _id: string; }) => affiliation._id === 'Student');
        expect(affiliationStudent).toBeDefined();
        expect(affiliationStudent.count).toBe(1);

        const graduationYear2023 = resAnalytics.body.graduationYears.find((graduationYear: { _id: string; }) => graduationYear._id === '2023');
        expect(graduationYear2023).toBeDefined();
        expect(graduationYear2023.count).toBe(1);

        console.log(resAnalytics.body)

        // Clean up: Delete the post created during the test
        await request(app).delete(`/profiles/${profile1Id}`);
        await request(app).delete(`/profiles/${profile2Id}`);
    });
});