/** Import packages */
import express from "express";
import donationSchema from "../model/donationModel.js";
import userSchema from "../model/userModel.js";
import Joi from "joi";
const router = express.Router();
import senMail from "../helpers/sendMails.js";
import mailsHtml from "../helpers/mailsHtml.js";

import serverError from "../helpers/serverError.js";

router.post("/create", async (req, res, next) => {
  try {
    const {
      bloodGroup, //direct
      healthIssue, //direct
      lastDonationTime, //direct
      descriptionHealthCondition, //direct
      medicineConsumption, //direct
      birthDate, //direct
      gender, //direct
      occupation, //direct
      centerColonyVillage, //direct
      weight, //direct
      pulse, //direct
      hb, //direct
      bp, //direct
      temperature, //direct
      tattooing, //done
      earPiercing, //done
      dentalExtraction, //done
      heartDisease, //done
      cancer, //done
      diabetes, //done
      hepatitisBC, //done
      std, //done
      typhoid, //done
      lungDisease, //done
      tuberculosis, //done
      allergicDisease, //done
      kidneyDisease, //done
      epilepsy, //done
      malaria, //done
      bleedingTendency, //done
      jaundice, //done
      faintingSpells, //done
      antibiotics, //done
      steroids, //done
      aspirin, //done/
      vaccinations, //done
      alcohol, //done
      dogBiteRabiesVaccine, //done
      surgeryHistoryMinor,
      surgeryHistoryMajor,
      surgeryHistoryBloodTransfusion, //done
      createdBy,
      AvailableDate,
      AvailableTime,
    } = req.body;

    const bodyValidation = Joi.object({
      bloodGroup: Joi.string()
        .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
        .required(),
      healthIssue: Joi.string().valid("yes", "no"),
      lastDonationTime: Joi.string().allow(""),//allowed empty string
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

    console.log("----<<< createdBy", createdBy, "\nfindUser", findUser);

    if (!findUser) return next(new serverError("Invalid user"));

    if (!findUser.verified) return next(new serverError("User not verified"));
    const donationCreate = await donationSchema.create({
      createdBy,
      country: findUser.country.toUpperCase(),
      city: findUser.city.toUpperCase(),
      state: findUser.state.toUpperCase(),
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
    });

    if (!donationCreate)
      return next(new serverError("Cannot save the donation", 500));

    await userSchema.findByIdAndUpdate(findUser._id, {
      $push: { notification: "You created a Blood Donation" },
    });

    const htmlcode = mailsHtml.createDonation(
      findUser.name,
      findUser.email,
      bloodGroup
    );

    senMail(
      findUser.email,
      "Blood Donation Confirmation - Donation Submitted for Verification",
      htmlcode
    );

    return res.json({
      msg: "Donation saved",
      status: true,
      data: donationCreate,
    });
  } catch (error) {
    console.log(error);
    return next(new serverError("Internal Server Error", 500));
  }
});

router.post("/request", async (req, res, next) => {
  try {
    const { recipienter, donationId } = req.body;

    const bodyValidation = Joi.object({
      recipienter: Joi.string().required(),
      donationId: Joi.string().required(),
    });
    const result = bodyValidation.validate(req.body);
    if (result.error) {
      console.log(result.error.details);
      return next(new serverError(result.error.message, 404));
    }

    const findUser = await userSchema.findById(recipienter);
    if (!findUser) return next(new serverError("Invalid user", 409));
    if (!findUser.verified)
      return next(new serverError("User not verified", 404));

    const findDonation = await donationSchema.findOne({ _id: donationId });
    if (!findDonation) return next(new serverError("Invalid Donation Id", 409));
    if (findDonation.createdBy.toString() === recipienter) {
      return next(new serverError("Cant request own Donation", 409));
    }
    const updateDonation = await donationSchema.findByIdAndUpdate(donationId, {
      requested: true,
      recipienter,
    });

    if (!updateDonation)
      return next(new serverError("donation cannot be requested", 409));
    return res.json({
      msg: "Donation saved",
      status: true,
      data: updateDonation,
    });
  } catch (error) {
    console.log(error);
    return next(new serverError("Internal Server Error", 500));
  }
});

router.get("/filter", async (req, res, next) => {
  try {
    const {
      country,
      city,
      state,
      bloodGroup,
      verified = true,
      requested = false,
      approved = false,
    } = req.query;
    const bodyValidation = Joi.object({
      country: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      bloodGroup: Joi.string(),
      verified: Joi.boolean(),
      requested: Joi.boolean(),
      approved: Joi.boolean(),
    });
    const result = bodyValidation.validate(req.query);
    if (result.error) {
      console.log(result.error.details);
      return next(new serverError(result.error.message, 409));
    }

    let filterQuery = { approved, verified, requested };
    if (country) {
      filterQuery.country = country;
    }
    if (city) {
      filterQuery.city = city;
    }
    if (state) {
      filterQuery.state = state;
    }
    if (bloodGroup) {
      filterQuery.bloodGroup = bloodGroup;
    }

    const findDonation = await donationSchema
      .find(filterQuery)
      .populate("createdBy recipienter");

    if (!findDonation) return next(new serverError("no Data Found", 409));
    return res.json({
      msg: " Data Found",
      status: true,
      data: findDonation,
    });
  } catch (error) {
    console.log(error);
    return next(new serverError("Internal Server ERror", 500));
  }
});

router.get("/details", async (req, res, next) => {
  try {
    const { donationId } = req.query;
    const bodyValidation = Joi.object({
      donationId: Joi.string().required(),
    });
    const result = bodyValidation.validate(req.query);
    if (result.error) {
      console.log(result.error.details);
      return res.json({
        msg: `${result.error.details}`,
        status: false,
        data: {},
      });
    }

    const findDonation = await donationSchema
      .findById(donationId)
      .populate("createdBy");
 
    if (!findDonation) return next(new serverError("No Data Found", 500));

    return res.json({
      msg: " Data Found",
      status: true,
      data: findDonation,
    });
  } catch (error) {
    console.log(error);
    return next(new serverError("Internal Server Error", 500));
  }
});

router.get("/my-donation", async (req, res, next) => {
  const { userId } = req.query;
  const bodyValidation = Joi.object({
    userId: Joi.string().required(),
  });
  const result = bodyValidation.validate(req.query);
  if (result.error) {
    console.log(result.error.details);
    return next(new serverError(result.error.message, 500));
  }
  try {
    const findDonation = await donationSchema
      .find({ $or: [{ recipienter: userId }, { createdBy: userId }] })
      .populate("createdBy recipienter");

    if (!findDonation.length === 0)
      return next(new serverError("No Data Found", 500));

    return res.json({
      msg: " Data Found",
      status: true,
      data: findDonation,
    });
  } catch (error) {
    console.log(error);
    return next(new serverError("Internal Server Error", 500));
  }
});

router.get("/location", async (req, res, next) => {
  const { key } = req.query;
  const bodyValidation = Joi.object({
    key: Joi.string().required(),
  });
  const result = bodyValidation.validate(req.query);
  if (result.error) {
    console.log(result.error.details);
    return next(new serverError(result.error.message, 500));
  }

  const DistictKey = await donationSchema
    .find({ requested: false, approved: false })
    .distinct(`${key}`);
  if (DistictKey.length === 0) {
    return next(new serverError("No Data Found", 500));
  }
  return res.json({
    msg: " Data Found",
    status: true,
    data: DistictKey,
  });
});

export default router;
