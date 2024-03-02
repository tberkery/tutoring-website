require("dotenv").config();
const mg = require("mongoose");
const URI = process.env.ATLAS_URI_DEV

async function connect() {
  try {
    await mg.connect(URI);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { connect };