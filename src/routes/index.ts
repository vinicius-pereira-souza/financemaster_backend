import express, { Request, Response } from "express";

const router = express();

router.get("/", (req: Request, res: Response) => {
  res.send("API is Working!");
});

export default router;
