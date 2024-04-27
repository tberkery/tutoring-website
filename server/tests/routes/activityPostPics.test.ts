export {}
const request = require('supertest');
const express = require('express');
const router = require('../../../server/routes/index.ts')
const App = require('../../../server/app.ts')
const { v4: uuidv4 } = require('uuid');
const { PutObjectCommand, DeleteObjectCommand, GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");

App.dbConnection(true)
const app = App.app

// Mock S3Client
// Mock S3Client and its methods
jest.mock("@aws-sdk/client-s3");
const mockSend = jest.fn();
S3Client.prototype.send = mockSend;

// Mock request file
const mockFile = {
  buffer: Buffer.from('fakefilecontent')
};


// Mock environment variables
process.env.AWS_ACTIVITY_POST_BUCKET_NAME = 'mock_bucket_name';
process.env.AWS_REGION = 'mock_region';
process.env.AWS_ACCESS_KEY_ID = 'mock_access_key';
process.env.AWS_SECRET_ACCESS_KEY = 'mock_secret_key';


describe('Activity Post API Endpoints', () => {
  afterEach(() => {
      jest.clearAllMocks();
  });

  test('POST /upload/:objectID', async () => {
      const mockObjectID = 'mockObjectID';
      const mockFile = {
          buffer: Buffer.from('mock_file_content')
      };
      

      // Mock S3Client send method
      mockSend.mockResolvedValueOnce({});

      const response = await request(app)
          .post(`activityPostPics/upload/${mockObjectID}`)
          .attach('activityPostPicture', mockFile);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('activity post picture uploaded successfully');
  });

  test('PUT /update/:objectID/:key - Success', async () => {
      const mockObjectID = 'mockObjectID';
      const mockKey = 'mockKey';
      const mockFile = {
          buffer: Buffer.from('mock_file_content')
      };

      // Mock S3Client send method
      mockSend.mockResolvedValueOnce({});

      const response = await request(app)
          .put(`/update/${mockObjectID}/${mockKey}`)
          .attach('activityPostPicture', mockFile);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('activity post picture updated successfully');
  });

  test('GET /get/:key - Success', async () => {
      const mockKey = 'mockKey';

      // Mock S3Client send method
      mockSend.mockResolvedValueOnce({
          Body: Buffer.from('mock_file_content'),
          ContentType: 'image/jpeg'
      });

      const response = await request(app).get(`/get/${mockKey}`);

      expect(response.status).toBe(200);
      expect(response.body.activityPostPicKey).toBeDefined();
  });

  test('DELETE /delete/:objectID/:key - Success', async () => {
      const mockObjectID = 'mockObjectID';
      const mockKey = 'mockKey';

      // Mock S3Client send method
      mockSend.mockResolvedValueOnce({});

      const response = await request(app).delete(`/delete/${mockObjectID}/${mockKey}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('activity post picture deleted successfully');
  });

  test('POST /upload/:objectID - File Not Provided', async () => {
      const mockObjectID = 'mockObjectID';

      const response = await request(app).post(`/upload/${mockObjectID}`);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('File is required');
  });

  afterAll(async () => {
    await App.close(); // Close the MongoDB connection
  });


  // Add more tests to cover other scenarios
});


