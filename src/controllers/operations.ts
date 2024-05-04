import { NextFunction, Request, Response } from "express";
import { OperationsService } from "../services/operations";
import { responseError, responseNormal } from "../utils/responseNormal";

export const createOperationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.body.name;
    const newOperation = await OperationsService.create(name);

    return responseNormal(res, newOperation, "operation completed", 201);
  } catch (error) {
    return responseError(res, "error to created operation", 500);
  }
};

export const deleteOperationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idOperation = req.params.id;
    const rowsDeleted = await OperationsService.delete(idOperation);
    if (rowsDeleted < 0) {
      throw new Error("error to deleted operations");
    }
    return responseNormal(res, {}, "order deleted", 200);
  } catch (error) {
    return responseError(res, "error to create order", 500, error);
  }
};

export const getOperationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const operationList = await OperationsService.getOperation();

    return responseNormal(res, operationList, "operation found", 200);
  } catch (error) {
    return responseError(res, "error to found operation", 500, error);
  }
};
