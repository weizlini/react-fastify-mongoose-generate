const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: false },
    phone: { type: String, required: false },
    city: { type: String, required: true },
    province: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
