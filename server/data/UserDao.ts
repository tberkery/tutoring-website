const User = require("../model/User.ts");
const mongoose = require("mongoose");

export class UserDao {
  async create({ name }: { name: string }) {
    const data = await User.create({ name });
    return data;
  }
  async read({ id }: { id: string}) {
    const data = await User.findById(id).lean().select("-__v");
    return data;
  }

  async readAll() {
    const data = await User.find().lean().select("-__v");
    return data;
  }
}