import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getPageUsersController,
} from "../controllers/users";
import { autNormalJwt } from "../middleware/autJwt";

const routerUsers = Router();

routerUsers.post("/create", autNormalJwt, createUserController);
routerUsers.get(
  "/page/:page/offset/:offset",
  autNormalJwt,
  getPageUsersController
);
routerUsers.delete("/delete/:id", autNormalJwt, deleteUserController);

export { routerUsers };
