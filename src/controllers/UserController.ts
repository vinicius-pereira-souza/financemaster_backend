import User from "../models/User";
import { Request, Response } from "express";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import { createUserToken } from "../utils/createUserToken";
import checkIsTheSameId from "../utils/checkIsTheSameId";

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

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // if check user exist
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).json({ errors: ["Usuário não encontrado."] });
  }

  // compare if password match
  const checkPassword = compareSync(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ errors: ["Senha Inválida."] });
  }

  try {
    const token = createUserToken(user._id);

    return res.status(200).json({ _id: user._id, token });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  const user = req.user;

  try {
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const user = await User.findById(id).select("-password").exec();

  // check if user exists
  if (!user) {
    return res.status(404).json({ errors: ["Usuário não encontrado."] });
  }

  try {
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
  }
};

const update = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, surname, currentBalance } = req.body;
  const image = req.file;

  checkIsTheSameId(id, req.user._id, res);

  let userUpdated = {};
};

export { register, login, getCurrentUser, getUserById, update };
