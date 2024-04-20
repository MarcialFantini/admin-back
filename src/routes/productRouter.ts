import { Router } from "express";
import {
  DelProductController,
  GetPageProductController,
  GetProductController,
  UpdateProductController,
} from "../controllers/products";

const routerProduct = Router();

routerProduct.post("/");
routerProduct.get("/one/:id", GetProductController);
routerProduct.get("/page/:page/offset/:offset", GetPageProductController);
routerProduct.delete("/one/:id", DelProductController);
routerProduct.patch("/one/:id", UpdateProductController);

export { routerProduct };
