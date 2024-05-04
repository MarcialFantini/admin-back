import { Express, Router } from "express";

import { categoriesRouter } from "./categoriesRouter";

import { routerProduct } from "./productRouter";
import routerPlace from "./placeRouter";
import { routerUsers } from "./usersRouter";
import { routerRole } from "./rolesRouter";
import { routerOrderRouter } from "./orderRouter";
import { roleSection } from "./roleSectionRouter";
import { operationRouter } from "./operationRouter";
import { movementsRouter } from "./movementsRouter";

export const routerApi = async (app: Express) => {
  //rout main all
  const routerMain = Router();
  //version 1
  const routerV1 = Router();

  //set routers in main
  app.use("/", routerMain);

  routerMain.use("/api/v1", routerV1);

  routerV1.use("/category", categoriesRouter);
  routerV1.use("/products", routerProduct);
  routerV1.use("/place", routerPlace);
  routerV1.use("/users", routerUsers);
  routerV1.use("/roles/sections", roleSection);
  routerV1.use("/roles", routerRole);
  routerV1.use("/orders", routerOrderRouter);
  routerV1.use("/operations", operationRouter);
  routerV1.use("/movements", movementsRouter);
};
