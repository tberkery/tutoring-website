import { ObjectId } from "mongodb";

export {}
require('dotenv').config()
const PostDao = require('../../data/PostDao');
const {faker} = require('@faker-js/faker');
const mg = require("mongoose");
const URI = process.env.ATLAS_URI_TEST

test('test create() with all fields', async ()=> {
    const postDao = new PostDao();
    await mg.connect(URI);
    const userId = faker.lorem.word();
    const title =  faker.lorem.word();
    const description =  faker.lorem.sentence();
    const imageUrl =  faker.internet.url();
    const price = faker.lorem.word();
    const courseId = Number(faker.finance.accountNumber());
    
    const post =  await postDao.create(userId, title, {description, imageUrl, price, courseId});
    expect(post.userId).toBe(userId);
    expect(post.title).toBe(title);
    expect(post.description).toBe(description);
    expect(post.imageUrl).toBe(imageUrl);
    expect(post.price).toBe(price);
    expect(post.courseId).toBe(courseId);
});

test('test create() without optional fields', async ()=> {
    const postDao = new PostDao();
    await mg.connect(URI);
    const userId = faker.lorem.word();
    const title =  faker.lorem.word();
    
    const post =  await postDao.create(userId, title);
    expect(post.userId).toBe(userId);
    expect(post.title).toBe(title);
});

test('test create() with some optional fields', async ()=> {
    const postDao = new PostDao();
    await mg.connect(URI);
    const userId = faker.lorem.word();
    const title =  faker.lorem.word();
    const description =  faker.lorem.sentence();
    const imageUrl =  faker.internet.url();
    const courseId = Number(faker.finance.accountNumber());
    
    const post =  await postDao.create(userId, title, {description, imageUrl, courseId});
    expect(post.userId).toBe(userId);
    expect(post.title).toBe(title);
    expect(post.description).toBe(description);
    expect(post.imageUrl).toBe(imageUrl);
    expect(post.courseId).toBe(courseId);
});

test('test readOne() for a valid id', async ()=> {
    const postDao = new PostDao();
    await mg.connect(URI);
    const userId = faker.lorem.word();
    const title =  faker.lorem.word();
    const description =  faker.lorem.sentence();
    const imageUrl =  faker.internet.url();
    const price = faker.lorem.word();
    const courseId = Number(faker.finance.accountNumber());
    
    const post =  await postDao.create(userId, title, {description, imageUrl, price, courseId});
    expect(post.userId).toBe(userId);
    expect(post.title).toBe(title);
    expect(post.description).toBe(description);
    expect(post.imageUrl).toBe(imageUrl);
    expect(post.price).toBe(price);
    expect(post.courseId).toBe(courseId);

    const id = post._id;
    const foundPost = await postDao.readOne(id);
    expect(foundPost.userId).toBe(userId);
    expect(foundPost.title).toBe(title);
    expect(foundPost.description).toBe(description);
    expect(foundPost.imageUrl).toBe(imageUrl);
    expect(foundPost.price).toBe(price);
    expect(foundPost.courseId).toBe(courseId);
});

test('test readOne() for an invalid id', async ()=> {
    await mg.connect(URI);
    const id = new ObjectId(1)
    const postDao = new PostDao();
    const foundPost = await postDao.readOne(id);
    expect(foundPost).toBe(null);
});


test('test readAll() on non empty table', async ()=> {
    const postDao = new PostDao();
    await postDao.deleteAll()
    await mg.connect(URI);
    for(let i = 0; i < 5; i++){
        const userId = faker.lorem.word();
        const title =  faker.lorem.word();
        const description =  faker.lorem.sentence();
        const imageUrl =  faker.internet.url();
        const price = faker.lorem.word();
        const courseId = Number(faker.finance.accountNumber());
        const post =  await postDao.create(userId, title, {description, imageUrl, price, courseId});
    }
    const profiles = await postDao.readAll();
    expect(profiles.length).toBe(5);
});



test('test update()', async ()=> {
    const postDao = new PostDao();
    await mg.connect(URI);
    const userId = faker.lorem.word();
    const title =  faker.lorem.word();
    const description =  faker.lorem.sentence();
    const imageUrl =  faker.internet.url();
    const price = faker.lorem.word();
    const courseId = Number(faker.finance.accountNumber());
    
    const post =  await postDao.create(userId, title, {description, imageUrl, price, courseId});
    expect(post.userId).toBe(userId);
    expect(post.title).toBe(title);
    expect(post.description).toBe(description);
    expect(post.imageUrl).toBe(imageUrl);
    expect(post.price).toBe(price);
    expect(post.courseId).toBe(courseId);

    const id = post._id;
    const newTitle = faker.lorem.word();
    const newPrice = faker.lorem.word();
    const updatingPost = await postDao.update(id, userId, newTitle, {description, imageUrl, price:newPrice, courseId})
    const updatedPost = await postDao.readOne(id);
    expect(updatedPost.userId).toBe(userId);
    expect(updatedPost.title).toBe(newTitle);
    expect(updatedPost.description).toBe(description);
    expect(updatedPost.imageUrl).toBe(imageUrl);
    expect(updatedPost.price).toBe(newPrice);
    expect(updatedPost.courseId).toBe(courseId);
});

test('test update() to add an optional param when none originally given', async ()=> {
    const postDao = new PostDao();
    await mg.connect(URI);
    const userId = faker.lorem.word();
    const title =  faker.lorem.word();
    const description =  faker.lorem.sentence();
    const imageUrl =  faker.internet.url();

    const post =  await postDao.create(userId, title);
    expect(post.userId).toBe(userId);
    expect(post.title).toBe(title);

    const id = post._id;
    const updatingPost = await postDao.update(id, userId, title, {description, imageUrl})
    const updatedPost = await postDao.readOne(id);
    expect(updatedPost.userId).toBe(userId);
    expect(updatedPost.title).toBe(title);
    expect(updatedPost.description).toBe(description);
    expect(updatedPost.imageUrl).toBe(imageUrl);

});

test('test update() to add an optional param originally not given', async ()=> {
    const postDao = new PostDao();
    await mg.connect(URI);
    const userId = faker.lorem.word();
    const title =  faker.lorem.word();
    const description =  faker.lorem.sentence();
    const imageUrl =  faker.internet.url();
    const price = faker.lorem.word();
    const courseId = Number(faker.finance.accountNumber());
    
    const post =  await postDao.create(userId, title, {description, imageUrl, price});
    expect(post.userId).toBe(userId);
    expect(post.title).toBe(title);
    expect(post.description).toBe(description);
    expect(post.imageUrl).toBe(imageUrl);
    expect(post.price).toBe(price);

    const id = post._id;
    const updatingPost = await postDao.update(id, userId, title, {description, imageUrl, price, courseId})
    const updatedPost = await postDao.readOne(id);
    expect(updatedPost.userId).toBe(userId);
    expect(updatedPost.title).toBe(title);
    expect(updatedPost.description).toBe(description);
    expect(updatedPost.imageUrl).toBe(imageUrl);
    expect(updatedPost.price).toBe(price);
    expect(updatedPost.courseId).toBe(courseId);
});

test('test delete() with a valid ID', async ()=> {
    const postDao = new PostDao();
    await mg.connect(URI);
    const userId = faker.lorem.word();
    const title =  faker.lorem.word();
    const description =  faker.lorem.sentence();
    const imageUrl =  faker.internet.url();
    const price = faker.lorem.word();
    const courseId = Number(faker.finance.accountNumber());
    
    const post =  await postDao.create(userId, title, {description, imageUrl, price, courseId});
    expect(post.userId).toBe(userId);
    expect(post.title).toBe(title);
    expect(post.description).toBe(description);
    expect(post.imageUrl).toBe(imageUrl);
    expect(post.price).toBe(price);
    expect(post.courseId).toBe(courseId);

    const id = post._id;
    const deleting = await postDao.delete(id);
    expect(deleting.title).toBe(title);
    const deleted = await postDao.readOne(id);
    expect(deleted).toBe(null);
});

test('test delete() for an invalid id', async ()=> {
    await mg.connect(URI);
    const id = new ObjectId(1)
    const postDao = new PostDao();
    const foundPost = await postDao.delete(id);
    expect(foundPost).toBe(null);
});