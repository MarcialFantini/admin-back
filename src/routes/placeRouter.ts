import { Router } from "express";
import {
  CreatePlaceController,
  DeletePlaceController,
  GetPlaceController,
  UpdatePlaceController,
} from "../controllers/place";
import { autNormalJwt } from "../middleware/autJwt";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { Sections } from "../sections/roles";

const routerPlace = Router();

routerPlace.post(
  "/create",
  autNormalJwt,
  roleMiddleware(Sections.place),
  CreatePlaceController
);
routerPlace.delete(
  "/delete/:id",
  autNormalJwt,
  roleMiddleware(Sections.place),
  DeletePlaceController
);
routerPlace.patch(
  "/update/:id",
  autNormalJwt,
  roleMiddleware(Sections.place),
  UpdatePlaceController
);
routerPlace.get(
  "/rows",
  autNormalJwt,
  roleMiddleware(Sections.place),
  GetPlaceController
);

export default routerPlace;
