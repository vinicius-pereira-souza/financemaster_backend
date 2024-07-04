import express, { Request, Response } from "express";
import userRoutes from "./userRoutes";

const router = express();

router.use("/api/users", userRoutes);

router.get("/test", (req: Request, res: Response) => {
  res.send("API is Working!");
});

export default router;
