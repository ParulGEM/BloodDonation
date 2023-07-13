import mongoose from "mongoose";
const url =
  "mongodb+srv://parulsahni3282:Parul06gem@cluster0.k2lebtg.mongodb.net";

const mongoDBConnections = () => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected successfully to MongoDB");
      // Perform database operations
    })
    .catch((error) => {
      console.error("Error occurred while connecting to MongoDB:", error);
    });
};
export default mongoDBConnections;
