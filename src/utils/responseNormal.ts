import { Response } from "express";

export const responseNormal = (
  res: Response,
  data: unknown,
  message: string,
  code: number
) => {
  return res.status(code).json({ data, message, code });
};

export const responseError = (
  res: Response,
  message: string,
  code: number,
  error?: unknown
) => {
  return res.status(code).json({ message, code, error });
};
