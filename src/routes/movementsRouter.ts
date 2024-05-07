import { Router } from "express";
import { getLastMovements } from "../controllers/InventoryMovements";
import { changePlaceOrderDetail } from "../controllers/orderDeatails";
import { autNormalJwt } from "../middleware/autJwt";

const movementsRouter = Router();

movementsRouter.get("/row", autNormalJwt, getLastMovements);
movementsRouter.patch("/update/detail", autNormalJwt, changePlaceOrderDetail);

export { movementsRouter };
