import { Router } from "express";
import {
  create,
  getAllTransitions,
  getTransitionById,
  deleteTransactions,
} from "../controllers/Transaction";
import { createValidate } from "../middlewares/transactionValidation";
import validate from "../middlewares/handlevalidation";

export default Router()
  .post("/", createValidate(), validate, create)
  .get("/", getAllTransitions)
  .get("/:id", getTransitionById)
  .delete("/:id", deleteTransactions);
