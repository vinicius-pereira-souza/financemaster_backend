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
      user.currentBalance += Number(amount);
    } else if (status === "output") {
      user.currentBalance -= Number(amount);
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

const getTransitionById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const transaction = await Transaction.findById(id).exec();

  if (!transaction) {
    return res.status(404).json({ errors: ["Transação não encontrada."] });
  }

  try {
    return res.status(200).json(transaction);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
  }
};

const deleteTransactions = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = req.user._id;

  // check if user exists
  const user = await User.findById(userId);
  if (!user) {
    return res.status(422).json({ errors: ["Usuário não encontrado."] });
  }

  // check if transaction exists
  const transaction = await Transaction.findById(id);
  if (!transaction) {
    return res.status(422).json({ errors: ["Transação não encontrado."] });
  }

  user.transactions = user.transactions.filter(
    (transactionId) => transactionId.toString() !== id.toString(),
  );

  try {
    await user.save();
    await transaction.deleteOne();

    return res.status(200).json({});
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
  }
};

const update = async (req: Request, res: Response) => {
  return res.send("atualizar");
};

export {
  create,
  getAllTransitions,
  getTransitionById,
  deleteTransactions,
  update,
};
