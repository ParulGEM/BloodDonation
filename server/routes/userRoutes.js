/** Import packages */
import express from "express";
import userScheme from "../model/userModel.js";
const router = express.Router();
// import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const saltKey = 10;
// const secretKey = "ParulSchema";

router.post("/create", async (req, res) => {
  console.log("/user/create");
  const { email, phone, name, password, city, state, country } = req.body;

  let encryptedPassword = await bcrypt.hash(password, saltKey);

 
  const finduser = await userScheme.findOne({ $or: [{ email }, { phone }] });
  if (finduser) {
    return res.json({
      msg: "User already registerd",
      status: false,
      data: {},
    });
  }

  const createUser = await userScheme.create({
    email,
    phone,
    name,
    password: encryptedPassword,
    city,
    state,
    country,
  });
  if (!createUser) {
    return res.json({
      msg: "Cannot save the user",
      status: false,
      data: {},
    });
  }
  return res.json({
    msg: "User Created successfully",
    status: true,
    data: createUser,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const findUser = await userScheme.findOne({ email });
  if (!findUser) {
    return res.json({
      msg: "Invalid Email",
      status: false,
      data: {},
    });
  }
  const isValidpassword = await bcrypt.compare(password, findUser.password);
  if (!isValidpassword) {
    return res.json({
      msg: "Incorrect password",
      status: false,
      data: {},
    });
  }
  return res.json({
    msg: "Login successfully",
    status: true,
    data: findUser,
  });
});
export default router;
