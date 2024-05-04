import { Router } from "express";
import {
  CreateProductController,
  DelProductController,
  GetPageProductController,
  GetProductByNameController,
  GetProductController,
  UpdateProductController,
} from "../controllers/products";

const routerProduct = Router();

routerProduct.post("/create", CreateProductController);
routerProduct.get("/one/:id", GetProductController);
routerProduct.get("/like/:name", GetProductByNameController);
routerProduct.get("/page/:page/offset/:offset", GetPageProductController);
routerProduct.delete("/delete/:id", DelProductController);
routerProduct.patch("/one/:id", UpdateProductController);

export { routerProduct };
