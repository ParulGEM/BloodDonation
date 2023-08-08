/** Import packages */
import express from "express";

const router = express.Router();

import userController from "../controller/user.js";

//API for register
router.post("/create", userController.userCreate);

//API for login
router.post("/login", userController.login);

export default router;
