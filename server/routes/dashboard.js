/** Import packages */
import express, { Router } from "express";
import donationSchema from "../model/donationModel.js";
import userSchema from "../model/userModel.js";
import Joi from "joi";
import sendMail from "../helpers/sendMails.js";
const router = express.Router();

router.get("/user", async (req, res) => {
  try {
    const finduser = await userSchema.find({ verified: false });

    return res.json({
      msg: "all user fetch",
      status: true,
      data: finduser,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "Internal error",
      status: false,
      data: {},
    });
  }
});
router.post("/approve/user", async (req, res) => {
  try {
    const { verified, email } = req.body;
    const bodyValidation = Joi.object({
      email: Joi.string().email().required(),
      verified: Joi.boolean().required(),
    });
    const result = bodyValidation.validate(req.body);
    if (result.error) {
      console.log(result.error.details);
      return res.json({
        msg: `${result.error.details}`,
        status: false,
        data: {},
      });
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
    if (!updateuser) {
      return res.json({
        msg: "user is not APPROVED",
        status: false,
        data: {},
      });
    }

    let htmlcode = "";
    let subject = "";
    if (verified) {
      subject = "Account Approved - Welcome to Blood Donation!";
      htmlcode = `
  <html>
  <head>
    <title>Account Approved</title>
    <style>
      body {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        font-family: Arial, sans-serif;
      }
      h2 {
        text-align: center;
      }
      p {
        margin-bottom: 10px;
      }
      .container {
        background-color: #f2f2f2;
        border-radius: 5px;
        padding: 20px;
      }
      .signature {
        margin-top: 20px;
        font-style: italic;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Account Approved</h2>
      <p>Dear ${updateuser.name},</p>
      <p>We are delighted to inform you that your account has been approved by the admin.</p>
      <p>Your account is now active, and you can start using our services immediately.</p>
      <p>Thank you for joining our platform. We look forward to your active participation!</p>
      <p class="signature">Best regards,<br>The Admin Team</p>
    </div>
  </body>
  </html>
  
`;
    } else {
      subject = "Account Rejection - Registration Update";
      htmlcode = `<html>
  <head>
    <title>Account Rejection</title>
    <style>
      body {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        font-family: Arial, sans-serif;
      }
      h2 {
        text-align: center;
      }
      p {
        margin-bottom: 10px;
      }
      .container {
        background-color: #f2f2f2;
        border-radius: 5px;
        padding: 20px;
      }
      .reason {
        font-weight: bold;
        color: #ff0000;
      }
      .signature {
        margin-top: 20px;
        font-style: italic;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Account Rejection</h2>
      <p>Dear ${updateuser.name},</p>
      <p>We regret to inform you that your account registration has been rejected by the admin.</p>
      <p>The reason for rejection is: <span class="reason">${rejectionReason}</span></p>
      <p>We appreciate your interest in joining our platform, but unfortunately, we are unable to proceed with your account at this time.</p>
      <p>If you have any further questions or need clarification, please feel free to contact our support team.</p>
      <p class="signature">Best regards,<br>The Admin Team</p>
    </div>
  </body>
  </html>
  `;
    }

    sendMail(updateuser.email, subject, htmlcode);

    return res.json({
      msg: " user updated  fetch",
      status: true,
      data: updateuser,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "Internal error",
      status: false,
      data: {},
    });
  }
});

router.post("/approve/donation", async (req, res) => {
  try {
    const { verified, donationId } = req.body;
    const bodyValidation = Joi.object({
      donationId: Joi.string().required(),
      verified: Joi.boolean().required(),
    });
    const result = bodyValidation.validate(req.body);
    if (result.error) {
      console.log(result.error.details);
      return res.json({
        msg: `${result.error.details}`,
        status: false,
        data: {},
      });
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
      return res.json({
        msg: "donation is not APPROVED",
        status: false,
        data: {},
      });
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
      htmlCode = `
  <html>
  <head>
    <title>Blood Donation Approved</title>
  </head>
  <body>
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <h2 style="text-align: center;">Blood Donation Approved</h2>
      <p>Dear ${updatedUser.name},</p>

      <p>We are pleased to inform you that your blood donation request has been approved by the admin.</p>
      <p>Donation Details:</p>
      <ul>
        <li><strong>Name:</strong> ${updatedUser.name}</li>
        <li><strong>Email:</strong> ${updatedUser.email}</li>
        <li><strong>Blood Group:</strong> ${updateDonation.bloodGroup}</li>
      </ul>
      <p>Your donation is greatly appreciated and will help save lives. Thank you for your generous contribution!</p>
      <p>Best regards,<br>The Blood Donation Team</p>
    </div>
  </body>
  </html>
  `;
    } else {
      subject = "Blood Donation Rejection - Donation Request Update";
      htmlCode = `<html>
  <head>
    <title>Blood Donation Rejection</title>
  </head>
  <body>
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <h2 style="text-align: center;">Blood Donation Rejection</h2>
      <p>Dear ${updatedUser.name},</p>
      <p>We regret to inform you that your blood donation request has been rejected by the admin.</p>
      <p>Donation Details:</p>
      <ul>
        <li><strong>Name:</strong> ${updatedUser.name}</li>
        <li><strong>Email:</strong> ${updatedUser.email}</li>
        <li><strong>Blood Group:</strong> ${updateDonation.bloodGroup}</li>
      </ul>
      <p>Unfortunately, we are unable to accept your donation at this time. We appreciate your willingness to contribute, but due to certain factors, it does not meet our requirements.</p>
      <p>We encourage you to continue supporting our cause and consider donating in the future when the circumstances are more suitable.</p>
      <p>Thank you for your understanding.</p>
      <p>Best regards,<br>The Blood Donation Team</p>
    </div>
  </body>
  </html>
  `;
    }

    sendMail(updatedUser.email, subject, htmlCode);
    return res.json({
      msg: " donation updated",
      status: true,
      data: updateDonation,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "Internal error",
      status: false,
      data: {},
    });
  }
});
router.post("/approve/donation-request", async (req, res) => {
  try {
    const { status, donationId } = req.body;
    const bodyValidation = Joi.object({
      donationId: Joi.string().required(),
      status: Joi.boolean().required(),
    });
    const result = bodyValidation.validate(req.body);
    if (result.error) {
      console.log(result.error.details);
      return res.json({
        msg: `${result.error.details}`,
        status: false,
        data: {},
      });
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
      return res.json({
        msg: "donation is not APPROVED",
        status: false,
        data: {},
      });
    }

    return res.json({
      msg: " donation updated",
      status: true,
      data: updateDonation,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      msg: "Internal error",
      status: false,
      data: {},
    });
  }
});
export default router;
