import { Types } from "mongoose";

const checkIsTheSameId = (id: string, loggedUserId: Types.ObjectId) => {
  if (id.toString() !== loggedUserId.toString()) {
    return true;
  }

  return false;
};

export default checkIsTheSameId;
