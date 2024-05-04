import { Router } from "express";
import { getLastMovements } from "../controllers/InventoryMovements";
import { changePlaceOrderDetail } from "../controllers/orderDeatails";

const movementsRouter = Router();

movementsRouter.get("/row", getLastMovements);
movementsRouter.patch("/update/detail", changePlaceOrderDetail);

export { movementsRouter };
