import { Request, Response } from "express";
import User from "../models/User";
import Transaction from "../models/Transition";

const create = async (req: Request, res: Response) => {
  const { title, amount, status, date } = req.body;
  const userId = req.user._id;

  // check if user exists
  const user = await User.findById(userId);
  if (!user) {
    return res.status(422).json({ errors: ["Usuário não encontrado."] });
  }

  // changing the balance value to the most recent value before changing to the new value
  user.lastBalance = user.currentBalance;

  // check status value
  if (user.currentBalance || user.currentBalance == 0) {
    if (status === "input") {
      user.currentBalance += amount;
    } else if (status === "output") {
      user.currentBalance -= amount;
    }
  }

  // create new document
  const createTransition = new Transaction({
    userId: user._id,
    title,
    amount,
    status,
    date,
  });

  try {
    user.transactions.push(createTransition._id);

    await createTransition.save();
    await user.save();

    return res.status(201).json(createTransition);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
  }
};

const getAllTransitions = async (req: Request, res: Response) => {
  const userId = req.user._id;

  const transitions = await Transaction.find({ userId });

  if (transitions.length == 0) {
    return res.status(204).json([]);
  } else {
    return res.status(200).json(transitions);
  }
};

export { create, getAllTransitions };
