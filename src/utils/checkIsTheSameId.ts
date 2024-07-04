import { Types } from "mongoose";
import { Response } from "express";

const checkIsTheSameId = (
  id: string,
  loggedUserId: Types.ObjectId,
  res: Response,
) => {
  if (id.toString() !== loggedUserId.toString()) {
    return res
      .status(409)
      .json({ errors: ["Usuário invalido para esta operação"] });
  }

  return true;
};

export default checkIsTheSameId;
