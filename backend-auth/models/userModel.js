const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: true },
  gender: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  membership_status: { type: String, required: true },
  bio: { type: String },
  address: { type: String, required: true },
  profile_picture: { type: String, required: false }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("User", userSchema);
