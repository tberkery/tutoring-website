import { ObjectId } from "mongodb";

require('dotenv').config()
const ProfileDao = require('../../data/ProfileDao');
const ProfileDaoModel = require('../../model/Profile');
const {faker} = require('@faker-js/faker');
const mg = require("mongoose");
const URI = process.env.ATLAS_URI_TEST

beforeAll(async () => {
    await mg.connect(URI);
    await ProfileDaoModel.deleteMany({});
});

afterAll(async () => {
    await ProfileDaoModel.deleteMany({});
    await mg.connection.close();
});

test('test create() with all fields', async ()=> {
    const profileDao = new ProfileDao();
    await mg.connect(URI);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const affiliation = "student";
    const graduationYear = "2024";
    const department = faker.lorem.word();
    const description = faker.lorem.paragraph();
    
    const profile =  await profileDao.create(firstName, lastName, email, affiliation, department, {graduationYear, description});
    expect(profile.firstName).toBe(firstName);
    expect(profile.lastName).toBe(lastName);
    expect(profile.email).toBe(email);
    expect(profile.affiliation).toBe(affiliation);
    expect(profile.graduationYear).toBe(graduationYear);
    expect(profile.department).toBe(department);
    expect(profile.description).toBe(description);
});

test('test create() without optional fields', async ()=> {
    await mg.connect(URI);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const affiliation = "faculty";
    const department = faker.lorem.word();
    const profileDao = new ProfileDao();
    
    const profile =  await profileDao.create(firstName, lastName, email, affiliation, department);
    expect(profile.firstName).toBe(firstName);
    expect(profile.lastName).toBe(lastName);
    expect(profile.email).toBe(email);
    expect(profile.affiliation).toBe(affiliation);
    expect(profile.department).toBe(department);
});

test('test create() without grad year with description', async ()=> {
    await mg.connect(URI);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const affiliation = "faculty";
    const department = faker.lorem.word();
    const description = faker.lorem.paragraph();
    const profileDao = new ProfileDao();
    
    const profile =  await profileDao.create(firstName, lastName, email, affiliation, department, {description});
    expect(profile.firstName).toBe(firstName);
    expect(profile.lastName).toBe(lastName);
    expect(profile.email).toBe(email);
    expect(profile.affiliation).toBe(affiliation);
    expect(profile.department).toBe(department);
    expect(profile.description).toBe(description);
});

test('test create() without description with grad year', async ()=> {
    await mg.connect(URI);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const affiliation = "student";
    const department = faker.lorem.word();
    const graduationYear = "2024";
    const profileDao = new ProfileDao();
    
    const profile =  await profileDao.create(firstName, lastName, email, affiliation, department, {graduationYear});
    expect(profile.firstName).toBe(firstName);
    expect(profile.lastName).toBe(lastName);
    expect(profile.email).toBe(email);
    expect(profile.affiliation).toBe(affiliation);
    expect(profile.department).toBe(department);
    expect(profile.graduationYear).toBe(graduationYear);
});

test('test readById() for a valid id', async ()=> {
    await mg.connect(URI);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const affiliation = "student";
    const graduationYear = "2024";
    const department = faker.lorem.word();
    const description = faker.lorem.paragraph();
    const profileDao = new ProfileDao();
    
    const profile =  await profileDao.create(firstName, lastName, email, affiliation, department, {graduationYear, description});
    expect(profile.firstName).toBe(firstName);
    expect(profile.lastName).toBe(lastName);
    expect(profile.email).toBe(email);
    expect(profile.affiliation).toBe(affiliation);
    expect(profile.graduationYear).toBe(graduationYear);
    expect(profile.department).toBe(department);
    expect(profile.description).toBe(description);

    const id = profile._id;
    const foundProfile = await profileDao.readById(id);
    expect(foundProfile.firstName).toBe(firstName);
    expect(foundProfile.lastName).toBe(lastName);
    expect(foundProfile.email).toBe(email);
    expect(foundProfile.affiliation).toBe(affiliation);
    expect(foundProfile.graduationYear).toBe(graduationYear);
    expect(foundProfile.department).toBe(department);
    expect(foundProfile.description).toBe(description);
});

test('test readById() for an invalid id', async ()=> {
    await mg.connect(URI);
    const id = new ObjectId(1)
    const profileDao = new ProfileDao();
    const foundProfile = await profileDao.readById(id);
    expect(foundProfile).toBe(null);
});

test('test readByEmail() for a valid email', async ()=> {
    await mg.connect(URI);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const affiliation = "student";
    const graduationYear = "2024";
    const department = faker.lorem.word();
    const description = faker.lorem.paragraph();
    const profileDao = new ProfileDao();
    
    const profile =  await profileDao.create(firstName, lastName, email, affiliation, department, {graduationYear, description});
    expect(profile.firstName).toBe(firstName);
    expect(profile.lastName).toBe(lastName);
    expect(profile.email).toBe(email);
    expect(profile.affiliation).toBe(affiliation);
    expect(profile.graduationYear).toBe(graduationYear);
    expect(profile.department).toBe(department);
    expect(profile.description).toBe(description);

    const foundProfile = await profileDao.readByEmail(email);
    expect(foundProfile[0].firstName).toBe(firstName);
    expect(foundProfile[0].lastName).toBe(lastName);
    expect(foundProfile[0].email).toBe(email);
    expect(foundProfile[0].affiliation).toBe(affiliation);
    expect(foundProfile[0].graduationYear).toBe(graduationYear);
    expect(foundProfile[0].department).toBe(department);
    expect(foundProfile[0].description).toBe(description);
});

test('test readByEmail() for an invalid email', async ()=> {
    await mg.connect(URI);
    const email = "fakeemail"
    const profileDao = new ProfileDao();
    const foundProfile = await profileDao.readByEmail(email);
    expect(foundProfile.length).toBe(0);
});


test('test readAll() on non empty table without filter', async ()=> {
    const profileDao = new ProfileDao();
    await profileDao.deleteAll()
    await mg.connect(URI);
    for(let i = 0; i < 5; i++){
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email();
        const affiliation = "student";
        const graduationYear = "2024";
        const department = faker.lorem.word();
        const description = faker.lorem.paragraph();
        const profile =  await profileDao.create(firstName, lastName, email, affiliation, department, {graduationYear, description});
    }
    const profiles = await profileDao.readAll({});
    expect(profiles.length).toBe(5);
});

test('test readAll() on non empty table with filter for firstName one match', async ()=> {
    const profileDao = new ProfileDao();
    await profileDao.deleteAll()
    await mg.connect(URI);
    let firstName;
    let lastName;
    let email;
    for(let i = 0; i < 5; i++){
        firstName = faker.person.firstName();
        lastName = faker.person.lastName();
        email = faker.internet.email();
        const affiliation = "student";
        const graduationYear = "2024";
        const department = faker.lorem.word();
        const description = faker.lorem.paragraph();
        const profile =  await profileDao.create(firstName, lastName, email, affiliation, department, {graduationYear, description});
    }
    const profiles = await profileDao.readAll({firstName});
    expect(profiles.length).toBe(1);
    expect(profiles[0].firstName).toBe(firstName);
    expect(profiles[0].lastName).toBe(lastName);
    expect(profiles[0].email).toBe(email);
});

test('test readAll() on non empty table with filter for firstName with more than one match', async ()=> {
    const profileDao = new ProfileDao();
    await profileDao.deleteAll()
    await mg.connect(URI);
    let firstName = faker.person.firstName();
    let lastName, email, affiliation, graduationYear, department, description;
    for(let i = 0; i < 5; i++){
        firstName =  i <= 3 ? faker.person.firstName(): firstName;
        lastName = faker.person.lastName();
        email = faker.internet.email();
        affiliation = "student";
        graduationYear = "2024";
        department = faker.lorem.word();
        description = faker.lorem.paragraph();
        await profileDao.create(firstName, lastName, email, affiliation, department, {graduationYear, description});
    }
    const profiles = await profileDao.readAll({firstName});
    expect(profiles.length).toBe(2);
    expect(profiles[0].firstName).toBe(firstName);
    expect(profiles[1].firstName).toBe(firstName);

    const profile = await profileDao.readAll({firstName, lastName});
    expect(profile.length).toBe(1);
    expect(profile[0].firstName).toBe(firstName);
    expect(profile[0].lastName).toBe(lastName);
    expect(profile[0].email).toBe(email);
    expect(profile[0].affiliation).toBe(affiliation);
    expect(profile[0].graduationYear).toBe(graduationYear);
    expect(profile[0].department).toBe(department);
    expect(profile[0].description).toBe(description);
});

test('test readAll() on non empty table with multiple filters', async ()=> {
    const profileDao = new ProfileDao();
    await profileDao.deleteAll()
    await mg.connect(URI);
    let firstName;
    let lastName;
    let email;
    for(let i = 0; i < 5; i++){
        firstName =  i <= 3 ? faker.person.firstName(): firstName;
        lastName = faker.person.lastName();
        email = faker.internet.email();
        const affiliation = "student";
        const graduationYear = "2024";
        const department = faker.lorem.word();
        const description = faker.lorem.paragraph();
        const profile =  await profileDao.create(firstName, lastName, email, affiliation, department, {graduationYear, description});
    }
    const profiles = await profileDao.readAll({firstName});
    expect(profiles.length).toBe(2);
    expect(profiles[0].firstName).toBe(firstName);
    expect(profiles[1].firstName).toBe(firstName);

});



test('test update()', async ()=> {
    await mg.connect(URI);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const affiliation = "student";
    const graduationYear = "2024";
    const department = faker.lorem.word();
    const description = faker.lorem.paragraph();
    const profileDao = new ProfileDao();
    
    const profile =  await profileDao.create(firstName, lastName, email, affiliation, department, {graduationYear, description});
    expect(profile.firstName).toBe(firstName);
    expect(profile.lastName).toBe(lastName);
    expect(profile.email).toBe(email);
    expect(profile.affiliation).toBe(affiliation);
    expect(profile.graduationYear).toBe(graduationYear);
    expect(profile.department).toBe(department);
    expect(profile.description).toBe(description);

    const id = profile._id;
    const newFirstName = faker.person.firstName();
    const updatingProfile = await profileDao.update(id, newFirstName, lastName, email, affiliation, department, {graduationYear, description})
    const updatedProfile = await profileDao.readById(id);
    expect(updatedProfile.firstName).toBe(newFirstName);
    expect(updatedProfile.lastName).toBe(lastName);
    expect(updatedProfile.email).toBe(email);
    expect(updatedProfile.affiliation).toBe(affiliation);
    expect(updatedProfile.graduationYear).toBe(graduationYear);
    expect(updatedProfile.department).toBe(department);
    expect(updatedProfile.description).toBe(description);
});

test('test update() to add an optional param when none originally given', async ()=> {
    await mg.connect(URI);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const affiliation = "student";
    const graduationYear = "2024";
    const department = faker.lorem.word();
    const profileDao = new ProfileDao();
    
    const profile =  await profileDao.create(firstName, lastName, email, affiliation, department);
    expect(profile.firstName).toBe(firstName);
    expect(profile.lastName).toBe(lastName);
    expect(profile.email).toBe(email);
    expect(profile.affiliation).toBe(affiliation);
    expect(profile.department).toBe(department);

    const id = profile._id;
    const updatingProfile = await profileDao.update(id, firstName, lastName, email, affiliation, department, {graduationYear})
    const updatedProfile = await profileDao.readById(id);
    expect(updatedProfile.firstName).toBe(firstName);
    expect(updatedProfile.lastName).toBe(lastName);
    expect(updatedProfile.email).toBe(email);
    expect(updatedProfile.affiliation).toBe(affiliation);
    expect(updatedProfile.graduationYear).toBe(graduationYear);
    expect(updatedProfile.department).toBe(department);
});

test('test update() to add an optional param originally not given', async ()=> {
    await mg.connect(URI);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const affiliation = "student";
    const graduationYear = "2024";
    const department = faker.lorem.word();
    const profileDao = new ProfileDao();
    
    const profile =  await profileDao.create(firstName, lastName, email, affiliation, department, {graduationYear});
    expect(profile.firstName).toBe(firstName);
    expect(profile.lastName).toBe(lastName);
    expect(profile.email).toBe(email);
    expect(profile.affiliation).toBe(affiliation);
    expect(profile.graduationYear).toBe(graduationYear)
    expect(profile.department).toBe(department);

    const id = profile._id;
    const description = faker.lorem.paragraph();
    const updatingProfile = await profileDao.update(id, firstName, lastName, email, affiliation, department, {graduationYear, description})
    const updatedProfile = await profileDao.readById(id);
    expect(updatedProfile.firstName).toBe(firstName);
    expect(updatedProfile.lastName).toBe(lastName);
    expect(updatedProfile.email).toBe(email);
    expect(updatedProfile.affiliation).toBe(affiliation);
    expect(updatedProfile.graduationYear).toBe(graduationYear);
    expect(updatedProfile.department).toBe(department);
    expect(updatedProfile.description).toBe(description)
});

test('test delete() with a valid ID', async ()=> {
    await mg.connect(URI);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const affiliation = "faculty";
    const department = faker.lorem.word();
    const description = faker.lorem.paragraph();
    const profileDao = new ProfileDao();
    
    const profile =  await profileDao.create(firstName, lastName, email, affiliation, department, {description});
    expect(profile.firstName).toBe(firstName);
    expect(profile.lastName).toBe(lastName);
    expect(profile.email).toBe(email);
    expect(profile.affiliation).toBe(affiliation);
    expect(profile.department).toBe(department);
    expect(profile.description).toBe(description);

    const id = profile._id;
    const deleting = await profileDao.delete(id);
    expect(deleting.firstName).toBe(firstName);
    const deleted = await profileDao.readById(id);
    expect(deleted).toBe(null);
});

test('test delete() for an invalid id', async ()=> {
    await mg.connect(URI);
    const id = new ObjectId(1)
    const profileDao = new ProfileDao();
    const foundProfile = await profileDao.delete(id);
    expect(foundProfile).toBe(null);
});

test('test add profile view for valid id', async() => {
    await mg.connect(URI)
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const affiliation = "student";
    const graduationYear = "2024";
    const department = faker.lorem.word();
    const profileDao = new ProfileDao();
    
    const profile =  await profileDao.create(firstName, lastName, email, affiliation, department, {graduationYear});

    const id = new ObjectId(1);
    const timestamp = "2022-02-17T13:36:45.954Z";
    const duration = 120;
    const updatedProfile = await profileDao.updateViews(profile._id, id, timestamp, duration)

    expect(updatedProfile._id).toMatchObject(profile._id);
    expect(updatedProfile.views).toHaveLength(1);

    const firstView = updatedProfile.views[0];
    expect(firstView.timestamp.toISOString()).toBe(timestamp); // Convert toISOString to match MongoDB Date format
    expect(firstView.durationInSeconds).toBe(duration);
    expect(firstView._id).toMatchObject(id);
})

test('test observe profile view for valid id', async() => {
    await mg.connect(URI)
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const affiliation = "student";
    const graduationYear = "2024";
    const department = faker.lorem.word();
    const profileDao = new ProfileDao();
    
    const profile =  await profileDao.create(firstName, lastName, email, affiliation, department, {graduationYear});

    const id = new ObjectId(1);
    const timestamp = "2022-02-17T13:36:45.954Z";
    const duration = 120;
    const updatedProfile = await profileDao.updateViews(profile._id, id, timestamp, duration)
    
    const retrievedProfile = await profileDao.readViewsById(profile._id);

    expect(retrievedProfile._id).toMatchObject(profile._id);
    expect(retrievedProfile.views).toHaveLength(1);

    const firstView = retrievedProfile.views[0];
    expect(firstView.timestamp.toISOString()).toBe(timestamp); // Convert toISOString to match MongoDB Date format
    expect(firstView.durationInSeconds).toBe(duration);
    expect(firstView._id).toMatchObject(id);
})

