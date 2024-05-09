import { Router } from "express";
import {
  categoriesCreateController,
  categoriesDelController,
  categoriesOneController,
  categoriesRowController,
} from "../controllers/categories";
import { autNormalJwt } from "../middleware/autJwt";
import { Sections } from "../sections/roles";
import { roleMiddleware } from "../middleware/roleMiddleware";

const categoriesRouter = Router();

categoriesRouter.get(
  "/one/:id",
  autNormalJwt,
  roleMiddleware(Sections.categories),
  categoriesOneController
);
categoriesRouter.get(
  "/row",
  autNormalJwt,
  roleMiddleware(Sections.categories),
  categoriesRowController
);
categoriesRouter.post(
  "/create",
  autNormalJwt,
  roleMiddleware(Sections.categories),
  categoriesCreateController
);
categoriesRouter.delete(
  "/delete/:id",
  autNormalJwt,
  roleMiddleware(Sections.categories),
  categoriesDelController
);

export { categoriesRouter };
