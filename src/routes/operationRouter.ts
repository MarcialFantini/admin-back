import { Router } from "express";
import {
  createOperationController,
  deleteOperationController,
  getOperationController,
} from "../controllers/operations";
import { autNormalJwt } from "../middleware/autJwt";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { Sections } from "../sections/roles";

const operationRouter = Router();

operationRouter.post(
  "/create",
  autNormalJwt,
  roleMiddleware(Sections.operation),
  createOperationController
);
operationRouter.delete(
  "/delete/:id",
  autNormalJwt,
  roleMiddleware(Sections.operation),
  deleteOperationController
);
operationRouter.get(
  "/page",
  autNormalJwt,
  roleMiddleware(Sections.operation),
  getOperationController
);

export { operationRouter };
