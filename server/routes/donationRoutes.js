/** Import packages */
import express from "express";

const router = express.Router();

import donationControl from "../controller/donation.js";

router.post("/create", donationControl.donationCreate);

router.post("/request", donationControl.donationRequest);

router.get("/filter", donationControl.donationFilter);

router.get("/details", donationControl.donationDetails);

router.get("/my-donation", donationControl.myDonation);

router.get("/location", donationControl.donationLocation);

export default router;
