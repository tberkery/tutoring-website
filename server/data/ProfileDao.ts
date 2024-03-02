import Profile = require("../model/Profile");
import hopkinsStatus = require("../utils/affiliationType");
import mongoose = require("mongoose");

export class ProfileDao {
  async create(firstName: string, lastName: string, email: string, affiliation: string, department: string, options?: {graduationYear?: string, description?: string}) {
    console.log("in create")
    let newProfile: any = {firstName, lastName, email, affiliation, department}
    if (options){
      if(options.graduationYear){
        newProfile.graduationYear = options.graduationYear
      }
      if (options.description){
        newProfile.description = options.description;
      }
    }
    const data = await Profile.create(newProfile);
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

  async update(_id: Number, firstName: string, lastName: string, email: string, affiliation: string, department: string, options?: {graduationYear?: string, description?: string, posts?: []}){
    let newProfile: any = {firstName, lastName, email, affiliation, department};
    if (options){
      if (options.graduationYear){
        newProfile.graduationYear = options.graduationYear;
      }
      if (options.description){
        newProfile.description = options.description;
      }
      if (options.posts){
        newProfile.posts = options.posts;
      }
    }
    console.log("the profile is ", newProfile);
    const data = await Profile.findByIdAndUpdate(_id, newProfile)
    return data;
  }

  async delete(_id: Number) {
    const data = await Profile.findByIdAndDelete(_id);
    return data;
  }

  async deleteAll(){
    await Profile.deleteMany({})
  }
}

module.exports = ProfileDao;