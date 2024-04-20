import express, { Express, Router } from "express";
import { Roles } from "../DB/models/Roles";
import { categoriesRouter } from "./categoriesRouter";

import { routerProduct } from "./productRouter";

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
};
