import Profile = require("../model/Profile");
import hopkinsStatus = require("../utils/affiliationType");
import mongoose = require("mongoose");

export class ProfileDao {
  async create(firstName: string, lastName: string, email: string, affiliation: hopkinsStatus, graduationYear: string, department: string) {
    const data = await Profile.create({ firstName, lastName, email, affiliation, graduationYear, department });
    return data;
  }

  async read({ email }: { email: string}) {
    const data = await Profile.findById(email).lean().select("-__v");
    return data;
  }

  async readAll() {
    const data = await Profile.find().lean().select("-__v");
    return data;
  }

  async update(id: Number, firstName: string, lastName: string, email: string, affiliation: hopkinsStatus, graduationYear: string, department: string){
    const data = await Profile.findByIdAndUpdate(id, {firstName, lastName, email, affiliation, graduationYear, department})
    return data;
  }

  async delete(id:Number) {
    const data = await Profile.findByIdAndDelete(id);
    return data;
  }
}

module.exports = ProfileDao;