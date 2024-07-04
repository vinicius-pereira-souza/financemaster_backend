import { validationResult, Result } from "express-validator";
import { Request, Response, NextFunction } from "express";

export default function validate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors: Result = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: string[] = [];

  errors.array().map((err) => extractedErrors.push(err.msg));

  return res.status(422).json({
    errors: extractedErrors,
  });
}
