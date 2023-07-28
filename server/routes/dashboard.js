/** Import packages */
import express, { Router } from "express";
import donationSchema from "../model/donationModel.js";
import userSchema from "../model/userModel.js";
import Joi from "joi";
import sendMail from "../helpers/sendMails.js";
import mailsHtml from "../helpers/mailsHtml.js";
import serverError from "../helpers/serverError.js";
const router = express.Router();

router.get("/user", async (req, res, next) => {
  try {
    const finduser = await userSchema.find({ verified: false });

    return res.json({
      msg: "all user fetch",
      status: true,
      data: finduser,
    });
  } catch (error) {
    console.log(error);
    return next(new serverError("Internal Server ERror", 500));
  }
});
router.post("/approve/user", async (req, res, next) => {
  try {
    const { verified, email } = req.body;
    const bodyValidation = Joi.object({
      email: Joi.string().email().required(),
      verified: Joi.boolean().required(),
    });
    const result = bodyValidation.validate(req.body);
    if (result.error) {
      console.log(result.error.details);
      return next(new serverError(result.error.message, 500));
    }
    let msg = "";
    if (verified) {
      msg = "Your account is verified by ADMIN";
    } else {
      msg = "Your account is REJECT by ADMIN";
    }
    const updateuser = await userSchema.findOneAndUpdate(
      { email },
      { verified: verified, $push: { notification: msg } },
      { new: true }
    );
    if (!updateuser) return next(new serverError("User is not Approved", 500));

    let htmlcode = "";
    let subject = "";
    if (verified) {
      subject = "Account Approved - Welcome to Blood Donation!";
      htmlcode = mailsHtml.accountApprove(updateuser.name);
    } else {
      subject = "Account Rejection - Registration Update";
      htmlcode = mailsHtml.accountReject(updateuser.name);
    }

    sendMail(updateuser.email, subject, htmlcode);

    return res.json({
      msg: "user updated  fetch",
      status: true,
      data: updateuser,
    });
  } catch (error) {
    console.log(error);
    return next(new serverError("Internal Server ERror", 500));
  }
});

router.post("/approve/donation", async (req, res, next) => {
  try {
    const { verified, donationId } = req.body;
    const bodyValidation = Joi.object({
      donationId: Joi.string().required(),
      verified: Joi.boolean().required(),
    });
    const result = bodyValidation.validate(req.body);
    if (result.error) {
      console.log(result.error.details);
      return next(new serverError(result.error.message, 500));
    }
    let msg = "";
    if (verified) {
      msg = "Your donation is verified by ADMIN";
    } else {
      msg = "Your donation  is REJECT by ADMIN";
    }
    const updateDonation = await donationSchema.findByIdAndUpdate(
      donationId,
      { verified: verified },
      { new: true }
    );
    if (!updateDonation) {
      return next(new serverError("Donation is not Approved", 500));
    }
    const updatedUser = await userSchema.findByIdAndUpdate(
      updateDonation.createdBy,
      { $push: { notification: msg } },
      { new: true }
    );

    let htmlCode = "";
    let subject = "";
    if (verified) {
      subject = "Blood Donation Approved - Thank You for Your Contribution!";
      htmlCode = mailsHtml.donationApprove(
        updatedUser.name,
        updatedUser.email,
        updateDonation.bloodGroup
      );
    } else {
      subject = "Blood Donation Rejection - Donation Request Update";
      htmlCode = mailsHtml.donationReject(
        updatedUser.name,
        updatedUser.email,
        updateDonation.bloodGroup
      );
    }

    sendMail(updatedUser.email, subject, htmlCode);
    return res.json({
      msg: " donation updated",
      status: true,
      data: updateDonation,
    });
  } catch (error) {
    console.log(error);
    return next(new serverError("Internal Server ERror", 500));
  }
});
router.post("/approve/donation-request", async (req, res, next) => {
  try {
    const { status, donationId } = req.body;
    const bodyValidation = Joi.object({
      donationId: Joi.string().required(),
      status: Joi.boolean().required(),
    });
    const result = bodyValidation.validate(req.body);
    if (result.error) {
      console.log(result.error.details);
      return next(new serverError(result.error.message, 500));
    }

    let dataQuery = {};
    if (status) {
      dataQuery.approved = true;
    } else {
      dataQuery.requested = false;
    }
    const updateDonation = await donationSchema.findByIdAndUpdate(
      donationId,
      dataQuery,
      { new: true }
    );
    if (!updateDonation) {
      return next(new serverError("Donation is not Approved", 500));
    }

    return res.json({
      msg: " donation updated",
      status: true,
      data: updateDonation,
    });
  } catch (error) {
    console.log(error);
    return next(new serverError("Internal Server Error", 500));
  }
});
export default router;
