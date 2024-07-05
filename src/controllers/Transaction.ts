import { Request, Response } from "express";
import User from "../models/User";
import Transaction from "../models/Transition";

const create = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { title, amount, status, date } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(422).json({ errors: ["Usuário não encontrado."] });
  }

  const newTransaction = new Transaction({
    userId: user._id,
    title,
    amount,
    status,
    date,
  });

  if (user.currentBalance) {
    if (status === "output") {
      user.currentBalance = user.currentBalance - amount;
    } else if (status === "input") {
      user.currentBalance = user.currentBalance + amount;
    }
  }

  user.lastBalance = user.currentBalance;
  user.transactions.push(newTransaction._id);

  try {
    await newTransaction.save();
    await user.save();

    return res.status(201).json(newTransaction);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
  }
};

export { create };
