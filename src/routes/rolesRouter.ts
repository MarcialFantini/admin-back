import { Router } from "express";
import {
  CreateRoleController,
  DeleteRoleController,
  GetRowController,
} from "../controllers/roles";
import { autNormalJwt } from "../middleware/autJwt";

const routerRole = Router();

routerRole.get("/row", autNormalJwt, GetRowController);
routerRole.post("/create", autNormalJwt, CreateRoleController);
routerRole.delete("/delete/:id", autNormalJwt, DeleteRoleController);

export { routerRole };
