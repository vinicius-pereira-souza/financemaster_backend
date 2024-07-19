import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    imageProfile: {
      type: String,
      default: "",
    },
    currentBalance: {
      type: Number,
      default: 0,
    },
    lastBalanceExit: {
      type: Number,
      default: 0,
    },
    lastBalanceEntry: {
      type: Number,
      default: 0,
    },
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
  },
  { timestamps: true },
);

const User = model("User", userSchema);

export default User;
