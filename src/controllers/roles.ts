import { NextFunction, Request, Response } from "express";
import { RolesServices } from "../services/Roles";
import { RolesInterface } from "../DB/models/Roles";
import { responseError, responseNormal } from "../utils/responseNormal";

export const CreateRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const role = req.body as RolesInterface;
    const isCreated = await RolesServices.createRole(role);

    if (!isCreated) {
      return responseError(res, "error to created rol", 500);
    }

    responseNormal(res, isCreated, "role created", 201);
  } catch (error) {
    responseError(res, "error to created rol", 500, error);
  }
};

export const DeleteRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idRole = req.params.id;

    await RolesServices.delRole(idRole);

    return responseNormal(res, {}, "role deleted", 200);
  } catch (error) {
    console.log(error);
    return responseError(res, "error to deleted role", 500, error);
  }
};

export const GetRowController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rows = await RolesServices.getRoles();

    responseNormal(res, rows, "roles found", 200);
  } catch (error) {
    responseError(res, "error to get roles", 500, error);
  }
};
