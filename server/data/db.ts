require("dotenv").config();
const mg = require("mongoose");
const URI = process.env.ATLAS_URI
const TEST_URI = process.env.ATLAS_URI_TEST

async function connect(is_test: boolean) {
  try {
    if (is_test) {
      await mg.connect(TEST_URI);
    } else {
      await mg.connect(URI);
    }
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connect;