import Profile = require("../model/Profile");
import mongoose = require("mongoose");

export class ProfileDao {
  async create(firstName: string, lastName: string, email: string, affiliation: string, department: string, options?: {graduationYear?: string, description?: string}) {
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
    return data;
  }

  async readById( _id: string) {
    const data = await Profile.findById(_id).lean().select("-__v");
    return data;
  }

  async readViewsById(_id: string) {
    const data = await Profile.findById(_id).lean().select("views");
    return data;
}

  async readByEmail(email:string) {
    const data = await Profile.find({email:email});
    return data;
  }

  async readAll({firstName, lastName, email}:{firstName?: string, lastName?: string, email?:string}) {
    if (!firstName && !lastName && !email) {
      const data = await Profile.find({}).lean().select("-__v");
      return data;
    }
    let f : any = [];
       
        if (firstName) {
          f.push({firstName: {$regex: firstName, $options: 'i'}})
            if (lastName) {
              f.push({lastName: {$regex: lastName, $options: 'i'}})
              if (email) {
                f.push({email: {$regex: email, $options: 'i'}})
              }
              const data = await Profile.find({$and : f}).lean().select("-__v");
              return data;
            } else {
              f.push({lastName: {$regex: firstName, $options: 'i'}})
              if (email) {
                const data = await Profile.find({$and : [{ $or: f}, {email: {$regex: email, $options: 'i'}}]}).lean().select("-__v");
                return data;
              }
              const data = await Profile.find({$or : f}).lean().select("-__v");
              return data;
            }
        } else if (email) {
          const data = await Profile.find({email: {$regex: email, $options: 'i'}}).lean().select("-__v");
          return data;
        }
        
        const data = await Profile.find({$and : f}).lean().select("-__v");
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
    const data = await Profile.findByIdAndUpdate(_id, newProfile)
    return data;
  }

  async updateViews(_id: String, viewerId: String, timestamp: String, duration: Number) {
    const data = await Profile.findByIdAndUpdate(_id,
      { $push: { views: { viewerId: viewerId, timestamp: timestamp, durationInSeconds: duration } } },
      { new: true })
    return data
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