import { Router } from "express";
import {
  createOperationController,
  deleteOperationController,
  getOperationController,
} from "../controllers/operations";

const operationRouter = Router();

operationRouter.post("/create", createOperationController);
operationRouter.delete("/delete/:id", deleteOperationController);
operationRouter.get("/page", getOperationController);

export { operationRouter };
