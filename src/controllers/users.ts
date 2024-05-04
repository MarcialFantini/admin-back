import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/users";
import { UserInterface } from "../DB/models/Users";
import { responseError, responseNormal } from "../utils/responseNormal";

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body as UserInterface;
    const isCreated = await UserService.createUser(user);
    if (!isCreated) {
      responseError(res, "error to created user", 500);
    }

    return responseNormal(res, isCreated, "user created", 201);
  } catch (error) {
    return responseError(res, "error to created user", 500, error);
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idUser = req.params.id;
    const isDeleted = await UserService.delUser(idUser);

    if (!isDeleted) {
      return responseError(res, "error to deleted user", 500);
    }
    return responseNormal(res, {}, "user deleted", 200);
  } catch (error) {
    return responseError(res, "error to deleted user", 500);
  }
};

export const getPageUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = Number(req.params.page);
    const offset = Number(req.params.offset);
    const userList = await UserService.getPageUser(page, offset);

    return responseNormal(res, userList, "users found", 200);
  } catch (error) {
    return responseError(res, "error to found users", 500);
  }
};
