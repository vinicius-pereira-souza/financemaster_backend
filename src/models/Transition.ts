import { Schema, model } from "mongoose";

const transactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
