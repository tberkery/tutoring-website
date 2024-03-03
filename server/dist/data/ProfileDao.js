"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileDao = void 0;
const Profile = require("../model/Profile");
class ProfileDao {
    async create(firstName, lastName, email, affiliation, department, options) {
        let newProfile = { firstName, lastName, email, affiliation, department };
        if (options) {
            if (options.graduationYear) {
                newProfile.graduationYear = options.graduationYear;
            }
            if (options.description) {
                newProfile.description = options.description;
            }
        }
        const data = await Profile.create(newProfile);
        return data;
    }
    async readById(_id) {
        const data = await Profile.findById(_id).lean().select("-__v");
        return data;
    }
    async readByEmail(email) {
        const data = await Profile.find({ email: email });
        return data;
    }
    async readAll() {
        const data = await Profile.find().lean().select("-__v");
        return data;
    }
    async update(_id, firstName, lastName, email, affiliation, department, options) {
        let newProfile = { firstName, lastName, email, affiliation, department };
        if (options) {
            if (options.graduationYear) {
                newProfile.graduationYear = options.graduationYear;
            }
            if (options.description) {
                newProfile.description = options.description;
            }
            if (options.posts) {
                newProfile.posts = options.posts;
            }
        }
        const data = await Profile.findByIdAndUpdate(_id, newProfile);
        return data;
    }
    async delete(_id) {
        const data = await Profile.findByIdAndDelete(_id);
        return data;
    }
    async deleteAll() {
        await Profile.deleteMany({});
    }
}
exports.ProfileDao = ProfileDao;
module.exports = ProfileDao;
