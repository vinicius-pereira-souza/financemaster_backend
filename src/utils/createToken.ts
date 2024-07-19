import jwt, { Secret } from "jsonwebtoken";
import config from "config";
import { Types } from "mongoose";

const jwtSecret: Secret = config.get<string>("jwt_secret");

const createToken = (id: Types.ObjectId) => {
  const token = jwt.sign({ id }, jwtSecret, { expiresIn: "1d" });

  return token;
};

export default createToken;
