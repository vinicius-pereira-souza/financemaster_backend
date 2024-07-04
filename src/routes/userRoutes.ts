import { Router } from "express";
import { register } from "../controllers/UserController";
// express validator
import validate from "../middlewares/handlevalidation";
import { registerValidate } from "../middlewares/userValidation";

export default Router().post(
  "/register",
  registerValidate(),
  validate,
  register,
);
