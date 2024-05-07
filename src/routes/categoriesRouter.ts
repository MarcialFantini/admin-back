import { Router } from "express";
import {
  categoriesCreateController,
  categoriesDelController,
  categoriesOneController,
  categoriesRowController,
} from "../controllers/categories";
import { autNormalJwt } from "../middleware/autJwt";

const categoriesRouter = Router();

categoriesRouter.get("/one/:id", autNormalJwt, categoriesOneController);
categoriesRouter.get("/row", autNormalJwt, categoriesRowController);
categoriesRouter.post("/create", autNormalJwt, categoriesCreateController);
categoriesRouter.delete("/delete/:id", autNormalJwt, categoriesDelController);

export { categoriesRouter };
