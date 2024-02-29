// require("dotenv").config({ path: "./config.env" });
// const exp = require("express");
// const cors = require("cors");
// const db = require("./data/db.ts");
// // const usr = require("./routes/users.ts");
// const profiles = require("./routes/profiles.ts")
// const app = express();
// // const path = require("path")
// const port = process.env.PORT || 6300;


// app.use(cors());
// app.use(exp.json());

// db.connect();

// // app.use(usr)
// app.use(profiles)

// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });
// server/server.ts

const app = require('./app.ts')
const PORT = process.env.PORT || 6300;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}...`);
});