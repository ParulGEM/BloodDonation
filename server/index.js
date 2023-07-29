import express from "express";
import cors from "cors";
const PORT = 5000;
import userRoutes from "./routes/userRoutes.js";
import mongoDBConnections from "./mongoDBConnection.js";
import donationRoutes from "./routes/donationRoutes.js";
import dashboardRoutes from "./routes/dashboard.js";

import userSchema from "./model/userModel.js";
import donationSchema from "./model/donationModel.js";
import authentication from "./middleware/authentication.js";
import sendMail from "./helpers/sendMails.js";

const app = express();
app.use(express.json());
app.use(cors());
mongoDBConnections();

app.use("/user", userRoutes);

app.use(authentication);

app.use("/donation", donationRoutes);
app.use("/dashboard", dashboardRoutes);

// app.post("/sendEmail", async (req, res) => {
//   const mail=req.body.mail;
//   sendMail(mail,"Sending Mail",`<h1>Hi, sending you an email</h1>`);
//   res.send("ok");
// });

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  return res.status(error.statusCode).json({
    status: error.status,
    msg: error.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
