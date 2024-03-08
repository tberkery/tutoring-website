import { ObjectId } from "mongodb";

export {}
require('dotenv').config()
const ActivityPostDao = require('../../data/ActivityPostDao');
const { faker } = require('@faker-js/faker');
const mg = require("mongoose");
const URI = process.env.ATLAS_URI_TEST

beforeAll(async () => {
    await mg.connect(URI);
});

afterAll(async () => {
    await mg.connection.close();
});

test('test create() with all fields', async ()=> {
    const activityPostDao = new ActivityPostDao();
    const userId = faker.lorem.word();
    const activityTitle =  faker.lorem.word();
    const activityDescription =  faker.lorem.word();
    const imageUrl = faker.image.avatar();
    const price =  faker.lorem.word();
    const tags = [];
    for (let i = 0; i < 5; i++) {
        tags.push(faker.lorem.word());
    }
    
    const activityPost =  await activityPostDao.create(userId, activityTitle, {activityDescription, imageUrl, price, tags});
    expect(activityPost.userId).toBe(userId);
    expect(activityPost.activityTitle).toBe(activityTitle);
    expect(activityPost.activityDescription).toBe(activityDescription);
    expect(activityPost.imageUrl).toBe(imageUrl);
    expect(activityPost.price).toBe(price);
    expect(activityPost.tags).toStrictEqual(tags);

});

test('test readOne() for a valid id', async ()=> {
    const activityPostDao = new ActivityPostDao();
    const userId = faker.lorem.word();
    const activityTitle = faker.lorem.word();
    const activityDescription = faker.lorem.word();
    const imageUrl = faker.image.avatar();
    const price = faker.lorem.word();
    const tags = [];
    for (let i = 0; i < 5; i++) {
        tags.push(faker.lorem.word());
    }
    
    const activityPost =  await activityPostDao.create(userId, activityTitle, {activityDescription, imageUrl, price, tags});
    expect(activityPost.userId).toBe(userId);
    expect(activityPost.activityTitle).toBe(activityTitle);
    expect(activityPost.activityDescription).toBe(activityDescription);
    expect(activityPost.imageUrl).toBe(imageUrl);
    expect(activityPost.price).toBe(price);
    expect(activityPost.tags).toStrictEqual(tags);

    const id = activityPost._id;
    const foundPost = await activityPostDao.readOne(id);
    expect(foundPost.userId).toBe(userId);
    expect(foundPost.activityTitle).toBe(activityTitle);
    expect(foundPost.activityDescription).toBe(activityDescription);
    expect(foundPost.imageUrl).toBe(imageUrl);
    expect(foundPost.price).toBe(price);
    expect(foundPost.tags).toStrictEqual(tags);

});

test('test readOne() for an invalid id', async ()=> {
    const activityPostDao = new ActivityPostDao();
    const id = new ObjectId(1)
    const foundCourse = await activityPostDao.readOne(id);
    expect(foundCourse).toBe(null);

});


test('test readAll() on non empty table', async ()=> {
    const activityPostDao = new ActivityPostDao();
    await activityPostDao.deleteAll()
    for(let i = 0; i < 5; i++){
        const userId = faker.lorem.word();
        const activityTitle = faker.lorem.word();
        const activityDescription = faker.lorem.word();
        const imageUrl = faker.image.avatar();
        const price = faker.lorem.word();

        const activityPost =  await activityPostDao.create(userId, activityTitle, {activityDescription, imageUrl, price});
    }
    const activityPosts = await activityPostDao.readAll();
    expect(activityPosts.length).toBe(5);

});



test('test update()', async ()=> {
    const activityPostDao = new ActivityPostDao();
    const userId = faker.lorem.word();
    const activityTitle = faker.lorem.word();
    const activityDescription = faker.lorem.word();
    const imageUrl = faker.image.avatar();
    const price = faker.lorem.word();
    const tags = []
    for (let i = 0; i < 3; i++) {
        tags.push(faker.lorem.word());
    }
    
    const activityPost =  await activityPostDao.create(userId, activityTitle, {activityDescription, imageUrl, price, tags});
    expect(activityPost.userId).toBe(userId);
    expect(activityPost.activityTitle).toBe(activityTitle);
    expect(activityPost.activityDescription).toBe(activityDescription);
    expect(activityPost.imageUrl).toBe(imageUrl);
    expect(activityPost.price).toBe(price);
    expect(activityPost.tags).toStrictEqual(tags);

    const id = activityPost._id;
    const newActivityDescription = faker.lorem.sentence();
    const updatingDescription = await activityPostDao.update(id, { activityDescription: newActivityDescription });
    const updatedActivityPost = await activityPostDao.readOne(id)
    expect(updatedActivityPost.userId).toBe(userId);
    expect(updatedActivityPost.activityTitle).toBe(activityTitle);
    expect(updatedActivityPost.activityDescription).toBe(newActivityDescription);
    expect(updatedActivityPost.imageUrl).toBe(imageUrl);
    expect(updatedActivityPost.price).toBe(price);
    expect(updatedActivityPost.tags).toStrictEqual(tags);

});

test('test update() on an invalid ID', async ()=> {
    const activityPostDao = new ActivityPostDao();
    const activityTitle = faker.lorem.word();
    const activityDescription = faker.lorem.word();
    const imageUrl = faker.image.avatar();
    const price = faker.lorem.word();
    const tags = []
    for (let i = 0; i < 3; i++) {
        tags.push(faker.lorem.word());
    }
    const id = new ObjectId(1)
    const updatingDescription = await activityPostDao.update(id, {activityTitle: activityTitle, description: activityDescription, imageUrl, price, tags});
    expect(updatingDescription).toBe("Post not found");
    
});

test('test delete() with a valid ID', async ()=> {
    const activityPostDao = new ActivityPostDao();
    const userId = faker.lorem.word();
    const activityTitle =  faker.lorem.word();
    const activityDescription =  faker.lorem.word();
    const imageUrl = faker.image.avatar();
    const price =  faker.lorem.word();
    const tags = [];
    for (let i = 0; i < 5; i++) {
        tags.push(faker.lorem.word());
    }

    const activityPost =  await activityPostDao.create(userId, activityTitle, {activityDescription, imageUrl, price, tags});
    expect(activityPost.userId).toBe(userId);
    expect(activityPost.activityTitle).toBe(activityTitle);
    expect(activityPost.activityDescription).toBe(activityDescription);
    expect(activityPost.imageUrl).toBe(imageUrl);
    expect(activityPost.price).toBe(price);
    expect(activityPost.tags).toStrictEqual(tags);

    const id = activityPost._id;
    const deleting = await activityPostDao.delete(id);
    expect(deleting.activityTitle).toBe(activityTitle);
    const deleted = await activityPostDao.readOne(id);
    expect(deleted).toBe(null);

});

test('test delete() for an invalid id', async ()=> {
    const id = new ObjectId(1)
    const activityPostDao = new ActivityPostDao();
    const foundCourse = await activityPostDao.delete(id);
    expect(foundCourse).toBe("Post not found");

});