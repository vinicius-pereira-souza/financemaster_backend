import User from "../models/User";
import { Request, Response } from "express";
import { genSaltSync, hashSync } from "bcrypt";
import { createUserToken } from "../utils/createUserToken";

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // check if user exists
  const user = await User.findOne({ email: email });

  if (user) {
    return res.status(409).json({
      errors: ["Este E-mail já existe, por favor utilize outro E-mail."],
    });
  }

  // Generate password hash
  const salt = genSaltSync(10);
  const passwordHash = hashSync(password, salt);

  const createUser = new User({
    name,
    email,
    password: passwordHash,
    surname: "",
    imageProfile: "",
    currentBalance: 0.0,
    transactions: [],
  });

  try {
    await createUser.save();
    const token = createUserToken(createUser._id);

    return res.status(201).json({ _id: createUser._id, token });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
  }
};

export { register };
