import { Router } from "express";
import {
  categoriesCreateController,
  categoriesDelController,
  categoriesOneController,
  categoriesRowController,
} from "../controllers/categories";

const categoriesRouter = Router();

categoriesRouter.get("/one/:id", categoriesOneController);
categoriesRouter.get("/row", categoriesRowController);
categoriesRouter.post("/create", categoriesCreateController);
categoriesRouter.delete("/delete", categoriesDelController);

export { categoriesRouter };
