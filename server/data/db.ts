require("dotenv").config();
const mg = require("mongoose");
const URI = process.env.ATLAS_URI
const testURI = process.env.ATLAS_URI_TEST

async function connect(isTest: boolean) {
  try {
    if (isTest === true) {
      await mg.connect(testURI);
    } else {
      await mg.connect(URI);
    }
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connect;