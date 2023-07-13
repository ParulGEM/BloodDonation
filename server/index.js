import express from "express";
import cors from "cors";
const PORT = 5000;
import userRoutes from "./routes/userRoutes.js";
import mongoDBConnections from "./mongoDBConnection.js";
import donationRoutes from "./routes/donationRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
mongoDBConnections();

app.use("/user", userRoutes);
app.use("/donation", donationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
