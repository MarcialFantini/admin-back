import { NextFunction, Request, Response } from "express";
import { responseError } from "../utils/responseNormal";
import { LoginService } from "../services/login";

export const autNormalJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      return responseError(res, "error to send token", 401);
    }

    const authorization = req.headers.authorization.split(" ")[1];

    const isValid = await LoginService.testToken(authorization);

    if (!isValid) {
      return responseError(res, "error to valid token", 403);
    }

    next();
  } catch (error) {
    return responseError(res, "error to valid token", 403);
  }
};
