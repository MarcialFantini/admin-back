import { NextFunction, Request, Response } from "express";
import { PlaceInterface } from "../DB/models/Place";
import { PlaceService } from "../services/place";
import { responseError, responseNormal } from "../utils/responseNormal";

export const CreatePlaceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const place = req.body as PlaceInterface;
    const newPlace = await PlaceService.create(place);

    if (!newPlace) {
      return responseError(res, "error to created place", 400);
    }

    return responseNormal(res, newPlace, "place created", 201);
  } catch (error) {
    return responseError(res, "error to created place", 500, error);
  }
};

export const DeletePlaceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const rowsDeleted = await PlaceService.deletePlace(id);

    if (rowsDeleted === 0) {
      return responseError(res, "place not found", 404);
    }

    return responseNormal(res, {}, "place deleted", 200);
  } catch (error) {
    return responseError(res, "error to delete the place", 500, error);
  }
};

export const UpdatePlaceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const placeUpdate = req.body as PlaceInterface;

    await PlaceService.updatePlace(id, placeUpdate);

    return responseNormal(res, {}, "place updated", 200);
  } catch (error) {
    return responseError(res, "error to update the place", 500, error);
  }
};

export const GetPlaceController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const placeRows = await PlaceService.getPlace();

    return responseNormal(res, placeRows, "places fetched", 200);
  } catch (error) {
    return responseError(res, "error to get places", 500, error);
  }
};
