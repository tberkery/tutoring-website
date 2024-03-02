export {}
const router = require('express').Router()
// import { Request, Response } from "express";
const ProfileDao = require('../data/ProfileDao');

const hopkinsStatus = require("../utils/affiliationType");

const profiles = new ProfileDao();

router.post("/", async (req: any, res: any) => {
  try {    
    console.log("in try")
    const {firstName, lastName, email, affiliation, graduationYear, department, description} : {firstName: string, lastName: string, email: string, affiliation: typeof hopkinsStatus, graduationYear: string, department: string, description: string} = req.body;
    const data = await profiles.create( firstName, lastName, email, affiliation, department, {graduationYear, description});
    // res.status(201).json({ data });
    res.json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req: any, res: any) => {
  try {
    const data = await profiles.readAll();
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.get("/:_id", async (req: any, res: any) => {
  const { _id }: { _id: string } = req.params;
  try {
    const data = await profiles.readById(_id);
    // if (!data) {
    //   return res.status(404).json({ msg: "User not found" });
    // }
    res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});


router.get("/getByEmail/:email", async (req: any, res: any) => {
    const { email }: { email: string } = req.params;
    try {
      const data = await profiles.readByEmail(email);
      // if (!data) {
      //   return res.status(404).json({ msg: "User not found" });
      // }
      res.status(200).json({ data });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  });

router.put("/:_id", async (req: any, res: any) => {
    const { _id }: { _id: string } = req.params;
    const {firstName, lastName, email, affiliation, graduationYear, department, description, posts} : {firstName: string, lastName: string, email: string, affiliation: typeof hopkinsStatus, graduationYear: string, department: string, description: string, posts: []} = req.body;
    try {
      const data = await profiles.update(_id, firstName, lastName, email, affiliation, department, {graduationYear, description, posts});
      if (!data) {
        res.status(404).json({ msg: "User not found" });
        return;
      }
      res.status(200).json({ data });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
});


router.delete("/:_id", async (req: any, res: any) => {
    const {_id}: {_id: string } = req.params;
    try {
        const data = await profiles.delete(_id);
        res.status(200).json({data})
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
})
//delete

module.exports = router;