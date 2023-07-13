import mongoose from "mongoose";

const Schema = mongoose.Schema;

const donationSchema = new Schema(
  {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    country: { type: String, trim: true, required: true },
    city: { type: String, trim: true, required: true },
    state: { type: String, trim: true, required: true },
    bloodGroup: { type: String, trim: true, required: true },
    heathissue: { type: Boolean, trim: true, required: true },
    lastDonationTime: { type: String, trim: true, required: true },
    descriptionHealthCondition: { type: String, trim: true, required: true },
    medicineConsumption: { type: String, trim: true, required: true },
    verified: { type: Boolean, default: false },
    available: { type: Boolean, default: true },
    recipienter: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const donationSchemaProfile = mongoose.model("donations", donationSchema);

export default donationSchemaProfile;

// name, age , email, phone,country , city, ( same as register ) blood group, any  heath issue , last donation time , description of health condition , medicine consumption
