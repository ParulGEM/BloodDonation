import donationSchema from "../model/donationModel.js";
import userSchema from "../model/userModel.js";
import Joi from "joi";
import sendMail from "../helpers/sendMails.js";
import mailsHtml from "../helpers/mailsHtml.js";
import serverError from "../helpers/serverError.js";

const dashboardGetUser = async (req, res, next) => {
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
};

const dashboardUserApprove = async (req, res, next) => {
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
      msg = "Your account is VERIFIED by ADMIN";
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
};

const dashboardDonationApprove = async (req, res, next) => {
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
};

const dashboardRequestApprove = async (req, res, next) => {
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
};

const dashboardEditUser = async (req, res, next) => {
  const { userId, city, state, country, name } = req.body;
  const bodyValidation = Joi.object({
    userId: Joi.string().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    name: Joi.string().required(),
  });

  const result = bodyValidation.validate(req.body);
  if (result.error) {
    console.log(result.error.details);
    return next(new serverError(result.error.message, 409));
  }
  const findUser = await userSchema.findById(userId);
  if (!findUser) return next(new serverError("User not found", 409));

  const editUser = await userSchema.findByIdAndUpdate(
    userId,
    {
      $set: {
        name,
        country: country.toUpperCase(),
        city: city.toUpperCase(),
        state: state.toUpperCase(),
      },
    },
    { new: true }
  );
  if (!editUser) return next(new serverError("Cannot save the user", 409));
  return res.json({
    msg: "User Updated successfully",
    status: true,
    data: editUser,
  });
};

const dashboardDeleteUser = async (req, res, next) => {
  const {
    query: { userId },
  } = req;
  const deleteUser = await userSchema.findByIdAndDelete(userId);
  if (!deleteUser) return next(new serverError("Cannot delete the user", 409));
  return res.json({
    msg: "User Deleted successfully",
    status: true,
    data: deleteUser,
  });
};

export default {
  dashboardGetUser,
  dashboardUserApprove,
  dashboardDonationApprove,
  dashboardRequestApprove,
  dashboardEditUser,
  dashboardDeleteUser,
};
