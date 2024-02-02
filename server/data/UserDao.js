const User = require("../model/User");
const mongoose = require("mongoose");

class UserDao {
  async create({name}) {
    const data = await User.create({name});
    return data;
  }

  async read(id) {
    const data = await User.findById(id).lean().select("-__v");
    return data;
  }

  async readAll() {
    const data = await User.find().lean().select("-__v");
    return data;
  }
}

module.exports = UserDao;