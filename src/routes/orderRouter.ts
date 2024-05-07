import { Router } from "express";
import {
  changeOrderOperationController,
  changeOrderPlaceController,
  createOrderController,
  getOrderController,
  getOrdersOneWithDetailsController,
  orderDeleteById,
} from "../controllers/orders";
import { autNormalJwt } from "../middleware/autJwt";

const routerOrderRouter = Router();

routerOrderRouter.post("/create", autNormalJwt, createOrderController);
routerOrderRouter.get(
  "/page/:page/limit/:limit",
  autNormalJwt,
  getOrderController
);
routerOrderRouter.get(
  "/one/:id",
  autNormalJwt,
  getOrdersOneWithDetailsController
);
routerOrderRouter.patch(
  "/place/update",
  autNormalJwt,
  changeOrderPlaceController
);
routerOrderRouter.patch(
  "/operation/change",
  autNormalJwt,
  changeOrderOperationController
);
routerOrderRouter.delete("/delete/:id", autNormalJwt, orderDeleteById);
export { routerOrderRouter };
