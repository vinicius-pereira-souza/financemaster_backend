import { Router } from "express";
import {
  register,
  login,
  getCurrentUser,
  getUserById,
  update,
} from "../controllers/UserController";
// express validator
import handlerErrors from "../middlewares/handlerErrors";
import {
  registerValidate,
  loginValite,
  updateValite,
} from "../middlewares/userValidation";
import verifyToken from "../middlewares/verifyToken";
import { imageUpload } from "../middlewares/uploadImage.";

export default Router()
  .post("/register", registerValidate(), handlerErrors, register)
  .post("/login", loginValite(), handlerErrors, login)
  .get("/", verifyToken, getCurrentUser)
  .get("/:id", getUserById)
  .patch(
    "/:id",
    verifyToken,
    imageUpload.single("imageProfile"),
    updateValite(),
    handlerErrors,
    update,
  );
