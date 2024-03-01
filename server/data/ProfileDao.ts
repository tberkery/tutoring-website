import Profile = require("../model/Profile");
import hopkinsStatus = require("../utils/affiliationType");
import mongoose = require("mongoose");

export class ProfileDao {
  async create(firstName: string, lastName: string, email: string, affiliation: hopkinsStatus, graduationYear: string, department: string, description: string) {
    console.log("in create")
    const data = await Profile.create({ firstName, lastName, email, affiliation, graduationYear, department, description });
    console.log("data is ", data)
    return data;
  }

  async readById( _id: string) {
    const data = await Profile.findById(_id).lean().select("-__v");
    return data;
  }
  async readByEmail(email:string) {
    const data = await Profile.find({email:email});
    return data;
  }

  async readAll() {
    const data = await Profile.find().lean().select("-__v");
    return data;
  }

  async update(_id: Number, firstName: string, lastName: string, email: string, affiliation: hopkinsStatus, graduationYear: string, department: string, description: string, posts: []){
    const data = await Profile.findByIdAndUpdate(_id, {firstName, lastName, email, affiliation, graduationYear, department, description, posts})
    return data;
  }

  async delete(_id: Number) {
    const data = await Profile.findByIdAndDelete(_id);
    return data;
  }
}

module.exports = ProfileDao;