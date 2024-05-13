import { Router } from "express";
import {
  changeOrderOperationController,
  changeOrderPlaceController,
  createOrderController,
  getLastOrders,
  getOrderController,
  getOrdersOneWithDetailsController,
  orderDeleteById,
} from "../controllers/orders";
import { autNormalJwt } from "../middleware/autJwt";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { Sections } from "../sections/roles";

const routerOrderRouter = Router();

routerOrderRouter.post(
  "/create",
  autNormalJwt,
  roleMiddleware(Sections.orders),
  createOrderController
);
routerOrderRouter.get(
  "/page/:page/limit/:limit",
  autNormalJwt,
  roleMiddleware(Sections.orders),
  getOrderController
);
routerOrderRouter.get(
  "/one/:id",
  autNormalJwt,
  roleMiddleware(Sections.orders),
  getOrdersOneWithDetailsController
);
routerOrderRouter.patch(
  "/place/update",
  autNormalJwt,
  roleMiddleware(Sections.orders),
  changeOrderPlaceController
);
routerOrderRouter.patch(
  "/operation/change",
  autNormalJwt,
  roleMiddleware(Sections.orders),
  changeOrderOperationController
);

routerOrderRouter.get(
  "/row/last",
  autNormalJwt,
  roleMiddleware(Sections.orders),
  getLastOrders
);

routerOrderRouter.delete("/delete/:id", autNormalJwt, orderDeleteById);
export { routerOrderRouter };
