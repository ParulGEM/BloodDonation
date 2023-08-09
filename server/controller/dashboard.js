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
const dashboardDeleteDonation = async (req, res, next) => {
  const {
    query: { donationId },
  } = req;
  const deleteDonation = await donationSchema.findByIdAndDelete(donationId);
  if (!deleteDonation)
    return next(new serverError("Cannot delete the Donation", 409));
  return res.json({
    msg: "Donation Deleted successfully",
    status: true,
    data: deleteDonation,
  });
};

const dashboardDonationEdit = async (req, res, next) => {
  try {
    const {
      donationId,
      bloodGroup,
      healthIssue,
      lastDonationTime,
      descriptionHealthCondition,
      medicineConsumption,
      birthDate,
      gender,
      occupation,
      centerColonyVillage,
      weight,
      pulse,
      hb,
      bp,
      temperature,
      tattooing,
      earPiercing,
      dentalExtraction,
      heartDisease,
      cancer,
      diabetes,
      hepatitisBC,
      std,
      typhoid,
      lungDisease,
      tuberculosis,
      allergicDisease,
      kidneyDisease,
      epilepsy,
      malaria,
      bleedingTendency,
      jaundice,
      faintingSpells,
      antibiotics,
      steroids,
      aspirin,
      vaccinations,
      alcohol,
      dogBiteRabiesVaccine,
      surgeryHistoryMinor,
      surgeryHistoryMajor,
      surgeryHistoryBloodTransfusion,
      createdBy,
      AvailableDate,
      AvailableTime,
    } = req.body;

    const bodyValidation = Joi.object({
      donationId: Joi.string().required(),
      bloodGroup: Joi.string()
        .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
        .required(),
      healthIssue: Joi.string().valid("yes", "no"),
      lastDonationTime: Joi.string().allow(""), //allowed empty string
      descriptionHealthCondition: Joi.string(),
      medicineConsumption: Joi.string(),
      birthDate: Joi.string(),
      gender: Joi.string().valid("male", "female", "other").required(),
      occupation: Joi.string().required(),
      centerColonyVillage: Joi.string(),
      weight: Joi.number().positive(),
      pulse: Joi.number().positive(),
      hb: Joi.number().positive(),
      bp: Joi.string(),
      temperature: Joi.string().required(),
      tattooing: Joi.boolean().required(),
      earPiercing: Joi.boolean().required(),
      dentalExtraction: Joi.boolean().required(),
      heartDisease: Joi.boolean().required(),
      cancer: Joi.boolean().required(),
      diabetes: Joi.boolean().required(),
      hepatitisBC: Joi.boolean().required(),
      std: Joi.boolean().required(),
      typhoid: Joi.boolean().required(),
      lungDisease: Joi.boolean().required(),
      tuberculosis: Joi.boolean().required(),
      allergicDisease: Joi.boolean().required(),
      kidneyDisease: Joi.boolean().required(),
      epilepsy: Joi.boolean().required(),
      malaria: Joi.boolean().required(),
      bleedingTendency: Joi.boolean().required(),
      jaundice: Joi.boolean().required(),
      faintingSpells: Joi.boolean().required(),
      antibiotics: Joi.boolean().required(),
      steroids: Joi.boolean().required(),
      aspirin: Joi.boolean().required(),
      vaccinations: Joi.boolean().required(),
      alcohol: Joi.boolean().required(),
      dogBiteRabiesVaccine: Joi.boolean().required(),
      surgeryHistoryMinor: Joi.boolean().required(),
      surgeryHistoryMajor: Joi.boolean().required(),
      surgeryHistoryBloodTransfusion: Joi.boolean().required(),
      AvailableDate: Joi.date().iso().required(),
      AvailableTime: Joi.string().required(),
      createdBy: Joi.string().required(),
    });

    const result = bodyValidation.validate(req.body);
    if (result.error) {
      console.log(result.error.details);
      return next(new serverError(result.error.message, 404));
    }

    let AvailableDateNTime = `On ${AvailableDate} at  ${AvailableTime}`;
    let lastSixMonth = `${tattooing ? "tattooing , " : ""}${
      earPiercing ? "ear Piercing , " : ""
    }${dentalExtraction ? "dental Extraction" : ""}`;

    const sufferFrom = `${heartDisease ? "heart Disease , " : ""}${
      cancer ? "cancer , " : ""
    }${diabetes ? "diabetes , " : ""}${hepatitisBC ? "hepatitis B/C , " : ""}${
      std ? "Sexually Transmitted Diseases , " : ""
    }${typhoid ? "Typhoid (last one year) , " : ""}${
      lungDisease ? "Lung Disease , " : ""
    }${tuberculosis ? "Tuberculosis , " : ""}${
      allergicDisease ? "Allergic Disease , " : ""
    }${kidneyDisease ? "Kidney Disease , " : ""}${
      epilepsy ? "Epilepsy (Charay rog) , " : ""
    }${malaria ? "Malaria (six months) , " : ""}${
      bleedingTendency ? "Abnormal Bleeding Tendency , " : ""
    }${jaundice ? "Jaundice (last one year) , " : ""}${
      faintingSpells ? "Fainting Spells" : ""
    }`;

    const taking = `${antibiotics ? "Antibiotics , " : ""}${
      steroids ? "Steroids , " : ""
    }${aspirin ? "Aspirin , " : ""}${vaccinations ? "Vaccinations , " : ""}${
      alcohol ? "Alcohol , " : ""
    }${dogBiteRabiesVaccine ? "Dog Bite Rabies Vaccine (1 year)" : ""}`;

    let surgeryHistoryString = `${surgeryHistoryMajor ? "Major , " : ""}${
      surgeryHistoryMinor ? "Minor , " : ""
    }${surgeryHistoryBloodTransfusion ? "Blood Transfusion  " : ""}`;

    const findUser = await userSchema.findById(createdBy);
    if (!findUser) return next(new serverError("Invalid user"));
    if (!findUser.verified) return next(new serverError("User not verified"));

    const donationUpdate = await donationSchema.findByIdAndUpdate(
      donationId,
      {
        $set: {
          bloodGroup,
          healthIssue,
          lastDonationTime,
          descriptionHealthCondition,
          medicineConsumption,
          birthDate,
          gender,
          occupation,
          weight,
          centerColonyVillage,
          pulse,
          bp,
          hb,
          temperature,
          lastSixMonth,
          sufferFrom,
          taking,
          surgeryHistoryString,
          AvailableDateNTime,
        },
      },
      { new: true }
    );

    if (!donationUpdate)
      return next(new serverError("Cannot save the donation", 500));

    return res.json({
      msg: "Donation Updated",
      status: true,
      data: donationUpdate,
    });
  } catch (error) {
    console.log(error);
    return next(new serverError("Internal Server Error", 500));
  }
};

export default {
  dashboardGetUser,
  dashboardUserApprove,
  dashboardDonationApprove,
  dashboardRequestApprove,
  dashboardEditUser,
  dashboardDeleteUser,
  dashboardDeleteDonation,
  dashboardDonationEdit,
};
