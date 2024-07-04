import { Router } from "express";
import {
  register,
  login,
  getCurrentUser,
  getUserById,
} from "../controllers/UserController";
// express validator
import validate from "../middlewares/handlevalidation";
import { registerValidate, loginValite } from "../middlewares/userValidation";
import verifyToken from "../middlewares/verifyToken";

export default Router()
  .post("/register", registerValidate(), validate, register)
  .post("/login", loginValite(), validate, login)
  .get("/", verifyToken, getCurrentUser)
  .get("/:id", getUserById);
