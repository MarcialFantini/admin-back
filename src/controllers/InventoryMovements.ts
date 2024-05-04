import { NextFunction, Request, Response } from "express";
import { InventoryMovementsService } from "../services/InventoryMovements";
import { responseError, responseNormal } from "../utils/responseNormal";

export const getLastMovements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movements = await InventoryMovementsService.getLastMovements();

    return responseNormal(res, movements, "movements found", 200);
  } catch (error) {
    return responseError(res, "error to found movements", 500, error);
  }
};
