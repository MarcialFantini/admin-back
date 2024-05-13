import { NextFunction, Request, Response } from "express";
import { OrderDetailsCreateInterface, OrdersService } from "../services/orders";
import { responseError, responseNormal } from "../utils/responseNormal";
import { LoginService } from "../services/login";

interface bodyResponseCreate {
  idUser: string;
  orders: OrderDetailsCreateInterface[];
  place_id: string;
}

export const createOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body as bodyResponseCreate;
    console.log(req.headers);
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new Error("error to send token");
    }

    const token = authorization.split(" ")[1];
    console.log(token);
    const id = await LoginService.testToken(token);
    console.log(id);

    if (!id) {
      return responseError(res, "error to found user", 400);
    }

    console.log("BODY: ", body);
    const isCompleted = await OrdersService.createOrder(
      id,
      body.orders,
      body.place_id
    );

    console.log("IS COMPLETE", isCompleted);

    if (!isCompleted) {
      throw new Error("Error to create order");
    }

    return responseNormal(res, {}, "order completed", 201);
  } catch (error) {
    console.log(error);
    return responseError(res, "error to created order", 500);
  }
};

export const getOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = req.params.page as unknown as number;
    const limit = req.params.limit as unknown as number;

    const list = await OrdersService.getOrders(page, limit);

    if (!list) {
      throw new Error("Error to get orders ");
    }

    return responseNormal(res, list, "orders found", 200);
  } catch (error) {
    return responseError(res, "error to found orders", 500, error);
  }
};

export const getOrdersOneWithDetailsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const orders = await OrdersService.getOrdersOneWithDetails(id);

    return responseNormal(res, orders, "found orders", 200);
  } catch (error) {
    return responseError(res, "error to found orders", 500);
  }
};

export const changeOrderPlaceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body as { order_id: string; place_id: string };

    const isUpdate = await OrdersService.changeOrderPlace(
      body.order_id,
      body.place_id
    );

    if (!isUpdate) {
      return responseError(res, "error to update place", 500);
    }

    return responseNormal(res, {}, "order place updated", 200);
  } catch (error) {
    return responseError(res, "error to update place", 500);
  }
};

export const changeOrderOperationController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idOrder, idOperation } = req.body as {
      idOrder: string;
      idOperation: string;
    };

    const newOperation = await OrdersService.changeOrderOperation(
      idOrder,
      idOperation
    );

    return responseNormal(res, newOperation, "operation change on order", 200);
  } catch (error) {
    console.log(error);
    return responseError(res, "error to order operation", 500);
  }
};

export const orderDeleteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idOrder = req.params.id;
    const rowsDelete = await OrdersService.deleteOrderById(idOrder);

    return responseNormal(res, rowsDelete, "order deleted", 200);
  } catch (error) {
    return responseError(res, "error to deleted order", 500);
  }
};

export const getLastOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await OrdersService.getOrderLastAndStatus();

    return responseNormal(res, orders, "orders found", 200);
  } catch (error) {
    return responseError(res, "error to found orders", 500, error);
  }
};
