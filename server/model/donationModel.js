import mongoose from "mongoose";

const Schema = mongoose.Schema;

const donationSchema = new Schema(
  {
    country: { type: String, trim: true, required: true },
    city: { type: String, trim: true, required: true },
    state: { type: String, trim: true, required: true },
    bloodGroup: { type: String, trim: true, required: true },
    healthIssue: { type: Boolean, trim: true, required: true },
    lastDonationTime: { type: String, trim: true},
    descriptionHealthCondition: { type: String, trim: true, required: true },
    medicineConsumption: { type: String, trim: true, required: true },
    birthDate: { type: String, trim: true, required: true },
    gender: { type: String, trim: true, required: true },
    occupation: { type: String, trim: true, required: true },
    centerColonyVillage: { type: String, trim: true, required: true },
    weight: { type: Number, trim: true},
    pulse: { type: Number, trim: true},
    hb: { type: Number, trim: true},
    bp: { type: String, trim: true },
    temperature: { type: String, trim: true },
    lastSixMonth: { type: String, trim: true },
    sufferFrom: { type: String, trim: true},
    taking: { type: String, trim: true},
    surgeryHistoryString: { type: String, trim: true },
    AvailableDateNTime:{ type: String, trim: true, required: true },
    verified: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    recipienter: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    requested: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const donationSchemaProfile = mongoose.model("donations", donationSchema);

export default donationSchemaProfile;

// name, age , email, phone,country , city, ( same as register ) blood group, any  heath issue , last donation time , description of health condition , medicine consumption
