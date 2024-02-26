require("dotenv").config({ path: "./config.env" });
const exp = require("express");
const cors = require("cors");
const db = require("./data/db.ts");
const usr = require("./routes/users.ts");
const app = express();
// const path = require("path")
const port = process.env.PORT || 6300;


app.use(cors());
app.use(exp.json());

db.connect();

app.use(usr)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});