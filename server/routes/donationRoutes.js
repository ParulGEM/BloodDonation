/** Import packages */
import express from "express";
import donationSchema from "../model/donationModel.js";

const router = express.Router();
router.post("/create", async (req, res) => {
  const { 
    createdBy,
    country,
    city,
    state,
    bloodGroup,
    heathissue,
    lastDonationTime,
    descriptionHealthCondition,
    medicineConsumption,
  } = req.body;

  const donationCreate = await donationSchema.create({
    createdBy,
    country,
    city,
    state,
    bloodGroup,
    heathissue,
    lastDonationTime,
    descriptionHealthCondition,
    medicineConsumption,
  });

  if (!donationCreate) {
    return res.json({
      msg: "Cannot save the donation",
      status: false,
      data: {},
    });
  }
  return res.json({
    msg: "Donation saved",
    status: true,
    data: donationCreate,
  });
});

router.get("/filter", async (req, res) => {
  const {
    country,
    city,
    state,
    bloodGroup,
    verified = true,
    available = true,
  } = req.query;
  let filterQuery = {};
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
    filterQuery.country = bloodGroup;
  }
  if (verified) {
    filterQuery.country = verified;
  }
  if (available) {
    filterQuery.country = available;
  }

  const findDonation = await donationSchema.find(filterQuery).lean();

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
});

router.get("/location", async (req, res) => {
  const { key } = req.query;

  const DistictKey = await donationSchema.find().distinct(`${key}`);
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
    data: DistictKey,
  });
});
router.put("/filter", async (req, res) => {
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
