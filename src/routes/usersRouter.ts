import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getPageUsersController,
} from "../controllers/users";
import { autNormalJwt } from "../middleware/autJwt";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { Sections } from "../sections/roles";

const routerUsers = Router();

routerUsers.post(
  "/create",
  autNormalJwt,
  roleMiddleware(Sections.users),
  createUserController
);
routerUsers.get(
  "/page/:page/offset/:offset",
  autNormalJwt,
  roleMiddleware(Sections.users),
  getPageUsersController
);
routerUsers.delete(
  "/delete/:id",
  autNormalJwt,
  roleMiddleware(Sections.users),
  deleteUserController
);

export { routerUsers };
