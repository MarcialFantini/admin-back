import { Router } from "express";
import {
  CreateRoleController,
  DeleteRoleController,
  GetRowController,
} from "../controllers/roles";

const routerRole = Router();

routerRole.get("/row", GetRowController);
routerRole.post("/create", CreateRoleController);
routerRole.delete("/delete/:id", DeleteRoleController);

export { routerRole };
