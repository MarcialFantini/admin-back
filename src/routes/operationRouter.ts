import { Router } from "express";
import {
  createOperationController,
  deleteOperationController,
  getOperationController,
} from "../controllers/operations";
import { autNormalJwt } from "../middleware/autJwt";

const operationRouter = Router();

operationRouter.post("/create", autNormalJwt, createOperationController);
operationRouter.delete("/delete/:id", autNormalJwt, deleteOperationController);
operationRouter.get("/page", autNormalJwt, getOperationController);

export { operationRouter };
