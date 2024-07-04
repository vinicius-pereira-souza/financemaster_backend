import { Secret, verify, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import config from "config";

const jwtSecret: Secret = config.get<string>("jwt_secret");

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const reqHeader = req.headers["authorization"];

  const token: string = (reqHeader && reqHeader.split(" ")[1]) || "";

  if (!token) {
    return res.status(401).json({ errros: ["Acesso invalido."] });
  }

  try {
    const decoded = verify(token, jwtSecret) as JwtPayload;

    req.user = await User.findById(decoded.id).select("-password");
    return next();
  } catch (err) {
    console.log(err);

    return res.status(500).json({ errors: ["Falha ao autenticar o token."] });
  }
};

export default verifyToken;
