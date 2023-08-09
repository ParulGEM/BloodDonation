/** Import packages */
import express, { Router } from "express";
const router = express.Router();

import dashboardControl from "../controller/dashboard.js";

router
  .route("/user")
  .get(dashboardControl.dashboardGetUser)
  .put(dashboardControl.dashboardEditUser)
  .delete(dashboardControl.dashboardDeleteUser);

router
  .route("/donation")
  .put(dashboardControl.dashboardDonationEdit)
  .delete(dashboardControl.dashboardDeleteDonation);
router.post("/approve/user", dashboardControl.dashboardUserApprove);

router.post("/approve/donation", dashboardControl.dashboardDonationApprove);

router.post(
  "/approve/donation-request",
  dashboardControl.dashboardRequestApprove
);

export default router;
