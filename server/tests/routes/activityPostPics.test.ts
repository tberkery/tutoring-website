export {}
const request = require('supertest');
const express = require('express');
const router = require('../../../server/routes/index.ts')
const { v4: uuidv4 } = require('uuid');
const { PutObjectCommand, DeleteObjectCommand, GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");

// Mock S3Client
jest.mock("@aws-sdk/client-s3", () => {
  return {
    S3Client: jest.fn(() => ({
      send: jest.fn()
    })),
    PutObjectCommand: jest.fn(),
    DeleteObjectCommand: jest.fn(),
    GetObjectCommand: jest.fn()
  };
});

// Mock request file
const mockFile = {
  buffer: Buffer.from('fakefilecontent')
};

describe('Test activityPostPics routes', () => {
  // Mock Express app
  const app = express();
  app.use(express.json());
  app.use(router);

  // Test for POST /upload/:objectID
  test('POST /upload/:objectID', async () => {
    const objectID = uuidv4();

    // Mock S3Client.send() to return a successful response
    S3Client.prototype.send.mockResolvedValueOnce({});

    const res = await request(app)
      .post(`/upload/${objectID}`)
      .attach('activityPostPicture', mockFile);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('activity post picture uploaded successfully');
  });

  // Test for PUT /update/:objectID/:key
  test('PUT /update/:objectID/:key', async () => {
    const objectID = uuidv4();
    const key = uuidv4();

    // Mock S3Client.send() to return a successful response
    S3Client.prototype.send.mockResolvedValueOnce({});

    const res = await request(app)
      .put(`/update/${objectID}/${key}`)
      .attach('activityPostPicture', mockFile);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('activity post picture updated successfully');
  });

  // Test for GET /get/:key
  test('GET /get/:key', async () => {
    const key = uuidv4();

    // Mock S3Client.send() to return a successful response
    S3Client.prototype.send.mockResolvedValueOnce({});

    const res = await request(app)
      .get(`/get/${key}`);

    expect(res.status).toBe(200);
    expect(res.body.activityPostPicKey).toMatch(`https://tutorhubactivitypostpics.s3.amazonaws.com/${key}`);
  });

  // Test for DELETE /delete/:objectID/:key
  test('DELETE /delete/:objectID/:key', async () => {
    const objectID = uuidv4();
    const key = uuidv4();

    // Mock S3Client.send() to return a successful response
    S3Client.prototype.send.mockResolvedValueOnce({});

    const res = await request(app)
      .delete(`/delete/${objectID}/${key}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('activity post picture deleted successfully');
  });
});
