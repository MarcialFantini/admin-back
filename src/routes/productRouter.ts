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
import { roleMiddleware } from "../middleware/roleMiddleware";
import { Sections } from "../sections/roles";

const routerProduct = Router();

routerProduct.post(
  "/create",
  autNormalJwt,

  roleMiddleware(Sections.products),
  CreateProductController
);
routerProduct.get(
  "/one/:id",
  autNormalJwt,
  roleMiddleware(Sections.products),
  GetProductController
);
routerProduct.get("/like/:name", autNormalJwt, GetProductByNameController);
routerProduct.get(
  "/page/:page/offset/:offset",
  autNormalJwt,
  roleMiddleware(Sections.products),
  GetPageProductController
);
routerProduct.delete(
  "/delete/:id",
  autNormalJwt,
  roleMiddleware(Sections.products),
  DelProductController
);
routerProduct.patch(
  "/one/:id",
  autNormalJwt,
  roleMiddleware(Sections.products),
  UpdateProductController
);

export { routerProduct };
