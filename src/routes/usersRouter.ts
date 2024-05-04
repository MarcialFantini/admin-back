import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getPageUsersController,
} from "../controllers/users";

const routerUsers = Router();

routerUsers.post("/create", createUserController);
routerUsers.get("/page/:page/offset/:offset", getPageUsersController);
routerUsers.delete("/delete/:id", deleteUserController);

export { routerUsers };
