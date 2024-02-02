require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const db = require("./data/db");
const users = require("./routes/users");
const app = express();
// const path = require("path")
const port = process.env.PORT || 6300;


app.use(cors());
app.use(express.json());

db.connect();

app.use(users)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});