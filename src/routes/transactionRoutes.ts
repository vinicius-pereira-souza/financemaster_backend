import { Router } from "express";
import { create } from "../controllers/Transaction";
import { createValidate } from "../middlewares/transactionValidation";
import validate from "../middlewares/handlevalidation";

export default Router().post("/", createValidate(), validate, create);
