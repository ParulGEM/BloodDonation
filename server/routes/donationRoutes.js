/** Import packages */
import express from "express";
import donationSchema from "../model/donationModel.js";
import userSchema from "../model/userModel.js";
import Joi from "joi";
const router = express.Router();
import senMail from "../helpers/sendMails.js";
router.post("/create", async (req, res) => {
  try {
    // const {
    //   createdBy,

    //   bloodGroup,
    //   heathissue,
    //   lastDonationTime,
    //   descriptionHealthCondition,
    //   medicineConsumption,
    // } = req.body;
    // const bodyValidation = Joi.object({
    //   createdBy: Joi.string(),
    //   country: Joi.string(),
    //   city: Joi.string(),
    //   state: Joi.string(),
    //   bloodGroup: Joi.string().required(),
    //   heathissue: Joi.string().required(),
    //   lastDonationTime: Joi.string().required(),
    //   descriptionHealthCondition: Joi.string().required(),
    //   medicineConsumption: Joi.string().required(),
    // });
    // const result = bodyValidation.validate(req.body);
    // if (result.error) {
    //   console.log(result.error.details);
    //   return res.json({
    //     msg: `${result.error.details}`,
    //     status: false,
    //     data: {},
    //   });
    // }

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
      AvailableTime
    } = req.body;
  
    let AvailableDateNTime=`On ${AvailableDate} at  ${AvailableTime}`
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
    if (!findUser) {
      return res.json({
        msg: "inValid user",
        status: false,
        data: {},
      });
    } 
    if (!findUser.verified) {
      return res.json({
        msg: "user not verified",
        status: false,
        data: {},
      });
    }
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
      surgeryHistoryString,AvailableDateNTime
    });

    if (!donationCreate) {
      return res.json({
        msg: "Cannot save the donation",
        status: false,
        data: {},
      });
    }
    await userSchema.findByIdAndUpdate(findUser._id, {
      $push: { notification: "You Created a Blood Donation" },
    });

    const htmlcode = `
  <html>
  <head>
    <title>Blood Donation Confirmation</title>
  </head>
  <body>
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <h2 style="text-align: center;">Blood Donation Confirmation</h2>
      <p>Dear ${findUser.name},</p>
      <p>Thank you for your blood donation. Your contribution has been received and is awaiting verification by the admin.</p>
      <p>Donation Details:</p>
      <ul>
        <li><strong>Name:</strong> ${findUser.name}</li>
        <li><strong>Email:</strong> ${findUser.email}</li>
        <li><strong>Blood Group:</strong> ${bloodGroup}</li>
      </ul>
      <p>The admin will review your donation soon. We appreciate your support and will notify you once your donation is verified.</p>
      <p>Thank you for your generosity!</p>
      <p>Best regards,<br>The Blood Donation Team</p>
    </div>
  </body>
  </html>
  `;

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
    return res.json({
      msg: "Internal error",
      status: false,
      data: {},
    });
  }
});

router.post("/request", async (req, res) => {
  try {
    const { recipienter, donationId } = req.body;

    const bodyValidation = Joi.object({
      recipienter: Joi.string().required(),
      donationId: Joi.string().required(),
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

    const findUser = await userSchema.findById(recipienter);
    if (!findUser) {
      return res.json({
        msg: "inValid user",
        status: false,
        data: {},
      });
    }
    if (!findUser.verified) {
      return res.json({
        msg: "user not verified",
        status: false,
        data: {},
      });
    }

    const findDonation = await donationSchema.findOne({ _id: donationId });
    if (!findDonation) {
      return res.json({
        msg: "Invalid Donation Id",
        status: false,
        data: {},
      });
    }
    if (findDonation.createdBy.toString() === recipienter) {
      return res.json({
        msg: "Cant request own Donation",
        status: false,
        data: {},
      });
    }
    const updateDonation = await donationSchema.findByIdAndUpdate(donationId, {
      requested: true,
      recipienter,
    });

    if (!updateDonation) {
      return res.json({
        msg: "donation cannot be requested",
        status: false,
        data: {},
      });
    }
    return res.json({
      msg: "Donation saved",
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

router.get("/filter", async (req, res) => {
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
      return res.json({
        msg: `${result.error.details}`,
        status: false,
        data: {},
      });
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
      .populate("createdBy recipienter")
      .lean();

    if (!findDonation) {
      return res.json({
        msg: "no Data Found",
        status: false,
        data: [],
      });
    }
    return res.json({
      msg: " Data Found",
      status: true,
      data: findDonation,
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

router.get("/details", async (req, res) => {
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
      .populate("createdBy")
      .lean();
    if (!findDonation) {
      return res.json({
        msg: "no Data Found",
        status: false,
        data: [],
      });
    }

    return res.json({
      msg: " Data Found",
      status: true,
      data: findDonation,
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

router.get("/my-donation", async (req, res) => {
  const { userId } = req.query;
  const bodyValidation = Joi.object({
    userId: Joi.string().required(),
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
  try {
    if (!userId) {
      return res.json({
        msg: "Send UserId",
        status: false,
        data: {},
      });
    }
    const findDonation = await donationSchema
      .find({ $or: [{ recipienter: userId }, { createdBy: userId }] })
      .populate("createdBy recipienter")
      .lean();

    if (!findDonation) {
      return res.json({
        msg: "no Data Found",
        status: false,
        data: [],
      });
    }
    return res.json({
      msg: " Data Found",
      status: true,
      data: findDonation,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/location", async (req, res) => {
  const { key } = req.query;
  const bodyValidation = Joi.object({
    key: Joi.string().required(),
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

  const DistictKey = await donationSchema
    .find({ requested: false, approved: false })
    .distinct(`${key}`);
  if (DistictKey.length === 0) {
    return res.json({
      msg: "no Data Found",
      status: false,
      data: [],
    }); 
  }
  return res.json({
    msg: " Data Found",
    status: true,
    data: DistictKey,
  });
});
router.put("/edit", async (req, res) => {
  const {
    donationId,
    country,
    city,
    state,
    bloodGroup,
    heathissue,
    lastDonationTime,
    descriptionHealthCondition,
    medicineConsumption,
  } = req.body;

  const updateDonation = await donationSchema.findByIdAndUpdate(
    donationId,
    {
      $set: {
        country,
        city,
        state,
        bloodGroup,
        heathissue,
        lastDonationTime,
        descriptionHealthCondition,
        medicineConsumption,
      },
    },
    {
      new: true,
    }
  );
  if (!updateDonation) {
    return res.json({
      msg: " Data  not updated",
      status: false,
      data: [],
    });
  }
  return res.json({
    msg: " Data Found",
    status: true,
    data: updateDonation,
  });
});

export default router;
