import jwt from "jsonwebtoken";
import serverError from "../helpers/serverError.js";
const secretKey = `${process.env.secretKey}`;
import userSchema from "../model/userModel.js";
import bcrypt from "bcrypt";

const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return next(new serverError("Unauthorized", 401));
    }
    let tokenUser;
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return next(new serverError("Forbidden (invalid token)", 403));
      }
      tokenUser = user;
    });

    const { email, password } = tokenUser;
    if (!email || !password)
      return next(new serverError("Forbidden (invalid token)", 403));

    const findUser = await userSchema.findOne({ email });
    if (!findUser) return next(new serverError("Invalid Token Email", 404));

    const isValidpassword = await bcrypt.compare(password, findUser.password);
    if (!isValidpassword)
      return next(new serverError("Incorrect password", 409));

    req.user = { email, password };
    next();
  } catch (error) {
    return next(new serverError("Incorrect password", 409));
  }
};

export default authentication;
