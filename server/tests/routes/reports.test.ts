export {}

const request = require('supertest');
const express = require('express');
const router = require('../../../server/routes/index.ts');
const App = require('../../../server/app.ts');

App.dbConnection(true);
const app = App.app;
app.use(express.json());
app.use('/reports', router);

describe('Test Report Routes', () => {
    // Test POST /reports
    test('POST /reports', async () => {
        const newReportData = {
            reporterId: 'exampleReporterId',
            reporterFirstName: 'John',
            reporterLastName: 'Doe',
            content: 'Example content',
            reporteeId: 'exampleReporteeId',
            reporteeFirstName: 'Jane',
            reporteeLastName: 'Doe'
        };

        const res = await request(app)
            .post('/reports')
            .send(newReportData);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('newReport');
    });

    // Test GET /reports/findAll
    test('GET /reports/findAll', async () => {
        const res = await request(app)
            .get('/reports/findAll');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('reports');
    });

    // Test GET /reports/findOne/:id
    test('should return the report when it exists', async () => {
        const newReportData = {
            reporterId: 'exampleReporterId',
            reporterFirstName: 'John',
            reporterLastName: 'Doe',
            content: 'Example content',
            reporteeId: 'exampleReporteeId',
            reporteeFirstName: 'Jane',
            reporteeLastName: 'Doe'
        };
    
        const createRes = await request(app)
            .post('/reports')
            .send(newReportData);
        
        const reportId = createRes.body.newReport._id;
    
        const getRes = await request(app).get(`/reports/findOne/${reportId}`);
        
        expect(getRes.status).toBe(200);
        expect(getRes.body).toHaveProperty('report');
    
        await request(app).delete(`/reports/${reportId}`);
    });

    test('should return all reports by a specific reporter', async () => {
        // Create mock data for the reports by the specific reporter
        const reporterId = 'exampleReporterId';
        const mockReports = [
            {
                id: 1,
                reporterId: reporterId,
                reporterFirstName: 'John',
                reporterLastName: 'Doe',
                content: 'Report 1 by John Doe',
                reporteeId: 'reporteeId1',
                reporteeFirstName: 'Jane',
                reporteeLastName: 'Doe'
            },
            {
                id: 2,
                reporterId: reporterId,
                reporterFirstName: 'John',
                reporterLastName: 'Doe',
                content: 'Report 2 by John Doe',
                reporteeId: 'reporteeId2',
                reporteeFirstName: 'Alice',
                reporteeLastName: 'Smith'
            }
        ];
    
        // Make a GET request to fetch reports by the specific reporter
        const res = await request(app).get(`/reports/findAllByReporterId/${reporterId}`);
        
        // Assertions
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('reports');
        expect(res.body.reports).toHaveLength(2);
    });

    test('should return all reports for a specific reportee', async () => {
        // Create mock data for the reports for the specific reportee
        const reporteeId = 'exampleReporteeId';
        const mockReports = [
            {
                id: 1,
                reporterId: 'reporterId1',
                reporterFirstName: 'John',
                reporterLastName: 'Doe',
                content: 'Report 1 for Jane Doe',
                reporteeId: reporteeId,
                reporteeFirstName: 'Jane',
                reporteeLastName: 'Doe'
            },
            {
                id: 2,
                reporterId: 'reporterId2',
                reporterFirstName: 'Alice',
                reporterLastName: 'Smith',
                content: 'Report 2 for Jane Doe',
                reporteeId: reporteeId,
                reporteeFirstName: 'Jane',
                reporteeLastName: 'Doe'
            }
        ];
    
        // Make a GET request to fetch reports for the specific reportee
        const res = await request(app).get(`/reports/findAllByReporteeId/${reporteeId}`);
        
        // Assertions
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('reports');
        expect(res.body.reports).toHaveLength(2);});
    });
    

    // // Test GET /reports/findAllByReporteeId/:reporteeId
    // test('GET /reports/findAllByReporteeId/:reporteeId', async () => {
    //     const res = await request(app)
    //         .get('/reports/findAllByReporteeId/exampleReporteeId');

    //     expect(res.status).toBe(200);
    //     expect(res.body).toHaveProperty('reports');
    // });

    // // Test PUT /reports/resolve/:id
    // test('PUT /reports/resolve/:id', async () => {
    //     const res = await request(app)
    //         .put('/reports/resolve/1');

    //     expect(res.status).toBe(200);
    //     expect(res.body).toHaveProperty('report');
    // });

    // // Test PUT /reports/:id
    // test('PUT /reports/:id', async () => {
    //     const res = await request(app)
    //         .put('/reports/1')
    //         .send({
    //             reporterId: 'updatedReporterId',
    //             reporterFirstName: 'Updated',
    //             reporterLastName: 'Name',
    //             content: 'Updated content',
    //             reporteeId: 'updatedReporteeId',
    //             reporteeFirstName: 'Updated',
    //             reporteeLastName: 'Name'
    //         });

    //     expect(res.status).toBe(200);
    //     expect(res.body).toHaveProperty('report');
    // });

    // // Test DELETE /reports/:id
    // test('DELETE /reports/:id', async () => {
    //     const res = await request(app)
    //         .delete('/reports/1');

    //     expect(res.status).toBe(200);
    //     expect(res.body.msg).toBe('Report deleted successfully');
    // });
