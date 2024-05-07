import { Router } from "express";
import {
  CreateProductController,
  DelProductController,
  GetPageProductController,
  GetProductByNameController,
  GetProductController,
  UpdateProductController,
} from "../controllers/products";
import { autNormalJwt } from "../middleware/autJwt";

const routerProduct = Router();

routerProduct.post("/create", autNormalJwt, CreateProductController);
routerProduct.get("/one/:id", autNormalJwt, GetProductController);
routerProduct.get("/like/:name", autNormalJwt, GetProductByNameController);
routerProduct.get(
  "/page/:page/offset/:offset",
  autNormalJwt,
  GetPageProductController
);
routerProduct.delete("/delete/:id", autNormalJwt, DelProductController);
routerProduct.patch("/one/:id", autNormalJwt, UpdateProductController);

export { routerProduct };
