// import { ObjectId } from "mongodb";

// export {}
// require('dotenv').config()
// const PostReviewDao = require('../../data/PostReviewDao');
// const PostReviewModel = require('../../../server/model/PostReview'); 
// const { faker } = require('@faker-js/faker');
// const mg = require("mongoose");
// const URI = process.env.ATLAS_URI_TEST

// beforeAll(async () => {
//     await mg.connect(URI);
//     await PostReviewModel.deleteMany({});
// });

// afterAll(async () => {
//     await PostReviewModel.deleteMany({});
//     await mg.connection.close();
// });

// test('test create() with all fields', async ()=> {
//     const activityPostDao = new PostReviewDao();
//     const userId = faker.lorem.word();
//     const activityTitle =  faker.lorem.word();
//     const activityDescription =  faker.lorem.word();
//     const activityPostPicKey = faker.image.avatar();
//     const price = faker.number.int()
//     const tags = [];
//     for (let i = 0; i < 5; i++) {
//         tags.push(faker.lorem.word());
//     }
    
//     const activityPost =  await activityPostDao.create(userId, activityTitle, {activityDescription, activityPostPicKey, price, tags});
//     expect(activityPost.userId).toBe(userId);
//     expect(activityPost.activityTitle).toBe(activityTitle);
//     expect(activityPost.activityDescription).toBe(activityDescription);
//     expect(activityPost.activityPostPicKey).toBe(activityPostPicKey);
//     expect(activityPost.price).toBe(price);
//     expect(activityPost.tags).toStrictEqual(tags);
//     await PostReviewModel.deleteMany({});
// });

// test('test readOne() for a valid id', async ()=> {
//     const activityPostDao = new PostReviewDao();
//     const userId = faker.lorem.word();
//     const activityTitle = faker.lorem.word();
//     const activityDescription = faker.lorem.word();
//     const activityPostPicKey = faker.image.avatar();
//     const price = faker.number.int()
//     const tags = [];
//     for (let i = 0; i < 5; i++) {
//         tags.push(faker.lorem.word());
//     }
    
//     const activityPost =  await activityPostDao.create(userId, activityTitle, {activityDescription, activityPostPicKey, price, tags});
//     expect(activityPost.userId).toBe(userId);
//     expect(activityPost.activityTitle).toBe(activityTitle);
//     expect(activityPost.activityDescription).toBe(activityDescription);
//     expect(activityPost.activityPostPicKey).toBe(activityPostPicKey);
//     expect(activityPost.price).toBe(price);
//     expect(activityPost.tags).toStrictEqual(tags);

//     const id = activityPost._id;
//     const foundPost = await activityPostDao.readOne(id);
//     expect(foundPost.userId).toBe(userId);
//     expect(foundPost.activityTitle).toBe(activityTitle);
//     expect(foundPost.activityDescription).toBe(activityDescription);
//     expect(foundPost.activityPostPicKey).toBe(activityPostPicKey);
//     expect(foundPost.price).toBe(price);
//     expect(foundPost.tags).toStrictEqual(tags);
//     await PostReviewModel.deleteMany({});
// });

// test('test readOne() for an invalid id', async ()=> {
//     const activityPostDao = new PostReviewDao();
//     const id = new ObjectId(1)
//     const foundCourse = await activityPostDao.readOne(id);
//     expect(foundCourse).toBe(null);
//     await PostReviewModel.deleteMany({});
// });


// test('test readAll() on non empty table', async ()=> {
//     const activityPostDao = new PostReviewDao();
//     await PostReviewModel.deleteMany({});
//     for(let i = 0; i < 5; i++){
//         const userId = faker.lorem.word();
//         const activityTitle = faker.lorem.word();
//         const activityDescription = faker.lorem.word();
//         const activityPostPicKey = faker.image.avatar();
//         const price = faker.number.int();

//         const activityPost =  await activityPostDao.create(userId, activityTitle, {activityDescription, activityPostPicKey, price});
//     }
//     const activityPosts = await activityPostDao.readAll();
//     expect(activityPosts.length).toBe(5);
//     await PostReviewModel.deleteMany({});
// });



// test('test update()', async ()=> {
//     const activityPostDao = new PostReviewDao();
//     const userId = faker.lorem.word();
//     const activityTitle = faker.lorem.word();
//     const activityDescription = faker.lorem.word();
//     const activityPostPicKey = faker.image.avatar();
//     const price = faker.number.int()
//     const tags = []
//     for (let i = 0; i < 3; i++) {
//         tags.push(faker.lorem.word());
//     }
    
//     const activityPost = await activityPostDao.create(userId, activityTitle, { activityDescription, activityPostPicKey, price, tags });
//     expect(activityPost.userId).toBe(userId);
//     expect(activityPost.activityTitle).toBe(activityTitle);
//     expect(activityPost.activityDescription).toBe(activityDescription);
//     expect(activityPost.activityPostPicKey).toBe(activityPostPicKey);
//     expect(activityPost.price).toBe(price);
//     expect(activityPost.tags).toStrictEqual(tags);

//     const id = activityPost._id;
//     const newActivityDescription = faker.lorem.sentence();
//     const updatingDescription = await activityPostDao.update(id, userId, activityTitle, { activityDescription: newActivityDescription, activityPostPicKey, price, tags });
//     const updatedActivityPost = await activityPostDao.readOne(id)
//     expect(updatedActivityPost.userId).toBe(userId);
//     expect(updatedActivityPost.activityTitle).toBe(activityTitle);
//     expect(updatedActivityPost.activityDescription).toBe(newActivityDescription);
//     expect(updatedActivityPost.activityPostPicKey).toBe(activityPostPicKey);
//     expect(updatedActivityPost.price).toBe(price);
//     expect(updatedActivityPost.tags).toStrictEqual(tags);
//     await PostReviewModel.deleteMany({});
// });

// test('test update() on an invalid ID', async ()=> {
//     const activityPostDao = new PostReviewDao();
//     const userId = faker.lorem.word();
//     const activityTitle = faker.lorem.word();
//     const activityDescription = faker.lorem.word();
//     const activityPostPicKey = faker.image.avatar();
//     const price = faker.number.int();
//     const tags = []
//     for (let i = 0; i < 3; i++) {
//         tags.push(faker.lorem.word());
//     }
    
//     const id = new ObjectId(1)
//     const newActivityDescription = faker.lorem.sentence();
//     const updatingDescription = await activityPostDao.update(id, userId, activityTitle, { activityDescription: newActivityDescription, activityPostPicKey, price, tags});
//     expect(updatingDescription).toBe(null);
//     await PostReviewModel.deleteMany({});
// });

// test('test delete() with a valid ID', async ()=> {
//     const activityPostDao = new PostReviewDao();
//     const userId = faker.lorem.word();
//     const activityTitle =  faker.lorem.word();
//     const activityDescription =  faker.lorem.word();
//     const activityPostPicKey = faker.image.avatar();
//     const price = faker.number.int()
//     const tags = [];
//     for (let i = 0; i < 5; i++) {
//         tags.push(faker.lorem.word());
//     }

//     const activityPost =  await activityPostDao.create(userId, activityTitle, {activityDescription, activityPostPicKey, price, tags});
//     expect(activityPost.userId).toBe(userId);
//     expect(activityPost.activityTitle).toBe(activityTitle);
//     expect(activityPost.activityDescription).toBe(activityDescription);
//     expect(activityPost.activityPostPicKey).toBe(activityPostPicKey);
//     expect(activityPost.price).toBe(price);
//     expect(activityPost.tags).toStrictEqual(tags);

//     const id = activityPost._id;
//     const deleting = await activityPostDao.delete(id);
//     expect(deleting).toBe("Post deleted");
//     const deleted = await activityPostDao.readOne(id);
//     expect(deleted).toBe(null);
//     await PostReviewModel.deleteMany({});
// });

// test('test delete() for an invalid id', async ()=> {
//     const id = new ObjectId(1)
//     const activityPostDao = new PostReviewDao();
//     const foundCourse = await activityPostDao.delete(id);
//     expect(foundCourse).toBe("Post not found");
//     await PostReviewModel.deleteMany({});
// });