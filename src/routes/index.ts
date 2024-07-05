import express, { Request, Response } from "express";
import userRoutes from "./userRoutes";
import verifyToken from "../middlewares/verifyToken";
import transactionRoutes from "./transactionRoutes";

const router = express();

router.use("/api/users", userRoutes);
router.use("/api/transactions", verifyToken, transactionRoutes);

router.get("/test", (req: Request, res: Response) => {
  res.send("API is Working!");
});

export default router;
