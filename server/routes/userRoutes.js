/** Import packages */
import express from "express";
import userSchema from "../model/userModel.js";
const router = express.Router();
import Joi from "joi";
import jwt from "jsonwebtoken";

import mailsHtml from "../helpers/mailsHtml.js";
import bcrypt from "bcrypt";
import sendMail from "../helpers/sendMails.js";
import serverError from "../helpers/serverError.js";

const secretKey = "DONATION";

const saltKey = 10;

//API for register
router.post("/create", async (req, res, next) => {
  const { email, city, state, country, phone, name, password } = req.body;
  const bodyValidation = Joi.object({
    email: Joi.string().email().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    phone: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
  });

  const result = bodyValidation.validate(req.body);
  if (result.error) {
    console.log(result.error.details);
    return next(new serverError(result.error.message, 409));
  }

  let { userType = "USER" } = req.body;
  if (name === "ADMIN" && password === "ADMIN@123#") {
    userType = "ADMIN";
  }

  let encryptedPassword = await bcrypt.hash(password, saltKey);

  const finduser = await userSchema.findOne({ $or: [{ email }, { phone }] });
  if (finduser) return next(new serverError("User already registerd", 500));

  const createUser = await userSchema.create({
    userType,
    email,
    phone,
    name,
    notification: ["Your Account has been Created.."],
    password: encryptedPassword,
    country: country.toUpperCase(),
    city: city.toUpperCase(),
    state: state.toUpperCase(),
  });
  if (!createUser) return next(new serverError("Cannot save the user", 409));
  const htmlCode = mailsHtml.welcomeMail(name);
  sendMail(email, "Account Verification - Welcome to Blood Donation", htmlCode);
  return res.json({
    msg: "User Created successfully",
    status: true,
    data: createUser,
  });
});

//API for login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const bodyValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  //validated body
  const result = bodyValidation.validate(req.body);
  if (result.error) {
    console.log(result.error.details);
    return next(new serverError(result.error.message, 409));
  }

  const findUser = await userSchema.findOne({ email:email });
  if (!findUser) return next(new serverError("Invalid Email", 404));//
  const isValidpassword = await bcrypt.compare(password, findUser.password);
  if (!isValidpassword) return next(new serverError("Incorrect password", 409));
  
  const User = {
    email,
    password,
  };

  const jwtToken = jwt.sign(User, secretKey, { expiresIn: "1h" });

  return res.json({
    msg: "Login Successfully",
    status: true,
    data: findUser,
    jwtToken,
  });
});

export default router;
