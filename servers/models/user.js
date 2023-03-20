import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min:2,
    max:40
  },
  lastName: {
    type: String,
    required: true,
    min:2,
    max:40
  },
  email: {
    type: String,
    required: true,
    min:2,
    max:40
  },
  password: {
    type: String,
    required: true,
    min:8,
  },
  address: String,

}
)

export const User = mongoose.model("User",UserSchema)