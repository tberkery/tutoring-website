"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
// import { Request, Response } from "express";
const ProfileDao = require('../data/ProfileDao');
const profiles = new ProfileDao();
router.post("/", async (req, res) => {
    try {
        const { firstName, lastName, email, affiliation, graduationYear, department, description } = req.body;
        const data = await profiles.create(firstName, lastName, email, affiliation, department, { graduationYear, description });
        res.json({ data });
    }
    catch (err) {
        res.status(500).send("Server Error");
    }
});
router.get("/", async (req, res) => {
    try {
        const data = await profiles.readAll();
        res.status(200).json({ data });
    }
    catch (err) {
        res.status(500).send("Server Error");
    }
});
router.get("/:_id", async (req, res) => {
    const { _id } = req.params;
    try {
        const data = await profiles.readById(_id);
        res.status(200).json({ data });
    }
    catch (err) {
        res.status(500).send("Server Error");
    }
});
router.get("/getByEmail/:email", async (req, res) => {
    const { email } = req.params;
    try {
        const data = await profiles.readByEmail(email);
        res.status(200).json({ data });
    }
    catch (err) {
        res.status(500).send("Server Error");
    }
});
router.put("/:_id", async (req, res) => {
    const { _id } = req.params;
    const { firstName, lastName, email, affiliation, graduationYear, department, description, posts } = req.body;
    try {
        const data = await profiles.update(_id, firstName, lastName, email, affiliation, department, { graduationYear, description, posts });
        if (!data) {
            res.status(404).json({ msg: "User not found" });
            return;
        }
        res.status(200).json({ data });
    }
    catch (err) {
        res.status(500).send("Server Error");
    }
});
router.delete("/:_id", async (req, res) => {
    const { _id } = req.params;
    try {
        const data = await profiles.delete(_id);
        res.status(200).json({ data });
    }
    catch (err) {
        res.status(500).send("Server Error");
    }
});
module.exports = router;
