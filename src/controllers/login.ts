import { NextFunction, Request, Response } from "express";
import { LoginService } from "../services/login";
import { responseError, responseNormal } from "../utils/responseNormal";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, email } = req.body as { password: string; email: string };

    if (!password || !email) {
      return responseError(res, "error to send password or email null", 400);
    }

    const token = await LoginService.login(email, password);

    if (!token) {
      return responseError(res, "error to create token", 401);
    }

    return responseNormal(res, { token }, "login completed ", 200);
  } catch (error) {
    return responseError(res, "error internal", 500, error);
  }
};

export const validTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.body.token;

    if (!token) {
      return responseError(res, "error to send token", 400);
    }

    const isValid = await LoginService.testToken(token);

    if (!isValid) {
      return responseError(res, "error to login token", 401);
    }
  } catch (error) {
    return responseError(res, "error to valid token", 500, error);
  }
};
