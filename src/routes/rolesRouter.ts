import { Router } from "express";
import {
  CreateRoleController,
  DeleteRoleController,
  GetRowController,
} from "../controllers/roles";
import { autNormalJwt } from "../middleware/autJwt";
import { Sections } from "../sections/roles";
import { roleMiddleware } from "../middleware/roleMiddleware";

const routerRole = Router();

routerRole.get(
  "/row",
  autNormalJwt,
  roleMiddleware(Sections.roles),
  GetRowController
);
routerRole.post(
  "/create",
  autNormalJwt,
  roleMiddleware(Sections.roles),
  CreateRoleController
);
routerRole.delete(
  "/delete/:id",
  autNormalJwt,
  roleMiddleware(Sections.roles),
  DeleteRoleController
);

export { routerRole };
