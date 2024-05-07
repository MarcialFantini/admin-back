import { Router } from "express";
import {
  CreatePlaceController,
  DeletePlaceController,
  GetPlaceController,
  UpdatePlaceController,
} from "../controllers/place";
import { autNormalJwt } from "../middleware/autJwt";

const routerPlace = Router();

routerPlace.post("/create", autNormalJwt, CreatePlaceController);
routerPlace.delete("/delete/:id", autNormalJwt, DeletePlaceController);
routerPlace.patch("/update/:id", autNormalJwt, UpdatePlaceController);
routerPlace.get("/rows", autNormalJwt, GetPlaceController);

export default routerPlace;
