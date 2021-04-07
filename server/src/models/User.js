const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
