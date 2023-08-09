import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, trim: true, unique: true },
    phone: { type: String, trim: true },
    name: { type: String, trim: true, required: true },
    userType: { type: String, default: "USER" },
    password: { type: String, trim: true, required: true },
    city: { type: String, trim: true, required: true },
    state: { type: String, trim: true, required: true },
    country: { type: String, trim: true, required: true },
    notification: [{ type: String }],
    verified: { type: Boolean, default: false },
    donateTime: { type: Date },
  },
  { timestamps: true }
);

const userSchemaProfile = mongoose.model("users", userSchema);

export default userSchemaProfile;
