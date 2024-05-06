import { Router } from "express";
import {
  changeOrderOperationController,
  changeOrderPlaceController,
  createOrderController,
  getOrderController,
  getOrdersOneWithDetailsController,
  orderDeleteById,
} from "../controllers/orders";

const routerOrderRouter = Router();

routerOrderRouter.post("/create", createOrderController);
routerOrderRouter.get("/page/:page/limit/:limit", getOrderController);
routerOrderRouter.get("/one/:id", getOrdersOneWithDetailsController);
routerOrderRouter.patch("/place/update", changeOrderPlaceController);
routerOrderRouter.patch("/operation/change", changeOrderOperationController);
routerOrderRouter.delete("/delete/:id", orderDeleteById);
export { routerOrderRouter };
