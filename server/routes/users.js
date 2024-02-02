const express = require("express");
const UserDao = require("../data/UserDao");

const router = express.Router();
const users = new UserDao();

router.post("/", async (req, res) => {
  try {
    const {name} = req.body
    const data = await users.create({name})
    res.status(201).json({data})
  } catch (err) {
    console.log(err);
  }
});

router.get("/all", async (req, res) => {
    try{
        const data = await users.readAll();
        res.json({data});
    } catch (err) {
        console.log(err);
    }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await users.read(id);
    res.json({data});

  } catch (err) {
    console.log(err);
  }
});

module.exports = router;