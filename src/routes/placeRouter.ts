import { Router } from "express";
import {
  CreatePlaceController,
  DeletePlaceController,
  GetPlaceController,
  UpdatePlaceController,
} from "../controllers/place";

const routerPlace = Router();

routerPlace.post("/create", CreatePlaceController);
routerPlace.delete("/delete/:id", DeletePlaceController);
routerPlace.patch("/update/:id", UpdatePlaceController);
routerPlace.get("/rows", GetPlaceController);

export default routerPlace;
