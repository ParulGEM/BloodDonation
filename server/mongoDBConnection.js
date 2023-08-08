import mongoose from "mongoose";

const mongoDBConnections = () => {
  mongoose
    .connect(
      `${process.env.DBURL}`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
      console.log("Connected successfully to MongoDB");
      // Perform database operations
    })
    .catch((error) => {
      console.error("Error occurred while connecting to MongoDB:", error);
    });
};
export default mongoDBConnections;
