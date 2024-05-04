import { NextFunction, Request, Response } from "express";
import { OrdersDetail } from "../services/ordersDetail";
import { responseError, responseNormal } from "../utils/responseNormal";

export const changePlaceOrderDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body as { idDetail: string; idPlace: string };

    return responseNormal(res, {}, "order detail change place", 200);
  } catch (error) {
    return responseError(res, " order detail error to change place", 500);
  }
};
