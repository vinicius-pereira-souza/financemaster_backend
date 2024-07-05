import { Router } from "express";
import {
  create,
  getAllTransitions,
  getTransitionById,
} from "../controllers/Transaction";
import { createValidate } from "../middlewares/transactionValidation";
import validate from "../middlewares/handlevalidation";

export default Router()
  .post("/", createValidate(), validate, create)
  .get("/", getAllTransitions)
  .get("/:id", getTransitionById);
