import { Router } from "express";
import {
  changeOrderPlaceController,
  createOrderController,
  getOrderController,
  getOrdersOneWithDetailsController,
} from "../controllers/orders";

const routerOrderRouter = Router();

routerOrderRouter.post("/create", createOrderController);
routerOrderRouter.get("/page/:page/limit/:limit", getOrderController);
routerOrderRouter.get("/one/:id", getOrdersOneWithDetailsController);
routerOrderRouter.patch("/place/update", changeOrderPlaceController);

export { routerOrderRouter };
