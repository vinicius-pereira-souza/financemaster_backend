import { Router } from "express";
import {
  create,
  getAllTransitions,
  getTransitionById,
  deleteTransactions,
  update,
} from "../controllers/Transaction";
import {
  createValidate,
  updateValidate,
} from "../middlewares/transactionValidation";
import validate from "../middlewares/handlevalidation";

export default Router()
  .post("/", createValidate(), validate, create)
  .get("/", getAllTransitions)
  .get("/:id", getTransitionById)
  .delete("/:id", deleteTransactions)
  .patch("/:id", updateValidate(), validate, update);
