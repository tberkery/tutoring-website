
const router = require('express').Router()
// import { Request, Response } from "express";
const ProfileDao = require('../data/ProfileDao');

const profiles = new ProfileDao();

const db = require('../model/Profile');

router.post("/", async (req: any, res: any) => {
  try {    
    const {firstName, lastName, email, affiliation, graduationYear, department, description} : {firstName: string, lastName: string, email: string, affiliation: string, graduationYear: string, department: string, description: string} = req.body;
    const data = await profiles.create( firstName, lastName, email, affiliation, department, {graduationYear, description});
    res.json({ data });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req: any, res: any) => {
  const {name1, name2, email} = req.query;
  try {
    const data = await profiles.readAll({firstName:name1, lastName:name2, email});
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.get("/:_id", async (req: any, res: any) => {
  const { _id }: { _id: string } = req.params;
  try {
    const data = await profiles.readById(_id);
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});


router.get("/getByEmail/:email", async (req: any, res: any) => {
    const { email }: { email: string } = req.params;
    try {
      const data = await profiles.readByEmail(email);
      res.status(200).json({ data });
    } catch (err) {
      res.status(500).send("Server Error");
    }
  });

router.get("/views/:_id", async (req: any, res: any) => {
  const { _id }: { _id: string } = req.params;
  try {
    const data = await profiles.readViewsById(_id);
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.put("/views/:_id", async (req: any, res: any) => {
  const { _id }: { _id: string } = req.params;
  const { viewerId, startTime, duration }: { viewerId: string, startTime: string, duration: number } = req.body; // start_time should be a date/time. duration should be a number of seconds.
  try {
    const data = await profiles.updateViews(_id, viewerId, startTime, duration) 
    if (!data) {
      res.status(404).json({ msg: "Profile view update not made" });
      return;
    }
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});



router.put("/:_id", async (req: any, res: any) => {
    const { _id }: { _id: string } = req.params;
    const {firstName, lastName, email, affiliation, graduationYear, department, description, posts} : {firstName: string, lastName: string, email: string, affiliation: string, graduationYear: string, department: string, description: string, posts: []} = req.body;
    try {
      const data = await db.profiles.update(_id, firstName, lastName, email, affiliation, department, {graduationYear, description, posts});
      if (!data) {
        res.status(404).json({ msg: "User not found" });
        return;
      }
      res.status(200).json({ data });
    } catch (err) {
      res.status(500).send("Server Error");
    }
});

router.get("/demographics/:_id", async (req: any, res: any) => {
  const { _id }: { _id: string } = req.params;
  try {
    const viewers = await profiles.readViewsById(_id);
    const viewerIds = viewers.views.map((view: { viewerId: any; }) => view.viewerId)
    const filteredViewerIds = viewerIds.filter((id: { id: any; }) => id !== undefined)
    console.log(filteredViewerIds);
    const departments = await db.aggregate( [
      {
        $match: { _id: { $in: viewerIds } }
      },
      {
        $group: {
            _id: "$department",
            departmentCount: { $count:{} } 
        }
      }
    ]).exec()
    console.log("Departments")
    console.log(departments)
    const affiliations = await db.aggregate( [
      {
        $match: { _id: { $in: viewerIds } }
      },
      {
        $group: {
            _id: "$affiliation",
            affiliationCount: { $count:{} }
        }
      }
    ]).exec()
    const graduationYears = await db.aggregate( [
      {
        $match: { _id: { $in: viewerIds } }
      },
      {
        $group: {
            _id: "$graduationYear",
            graduationYearCount: { $count:{} }
        }
      }
    ]).exec()
    res.status(200).json({ departments, affiliations, graduationYears });
  } catch (err) {
    res.status(500).send("Server Error");
  }
})

router.delete("/:_id", async (req: any, res: any) => {
    const {_id}: {_id: string } = req.params;
    try {
        const data = await profiles.delete(_id);
        res.status(200).json({data})
    } catch (err) {
        res.status(500).send("Server Error");
    }
})

module.exports = router;