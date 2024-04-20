import { NextFunction, Request, Response } from "express";
import { CategoriesService } from "../services/Categories";
import { CategoriesInterface } from "../DB/models/Categories";
import { responseError, responseNormal } from "../utils/responseNormal";

export const categoriesCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = req.body as unknown as CategoriesInterface;

    const isCreatedCategory = await CategoriesService.Create(category);

    if (!isCreatedCategory) {
      responseError(res, "category not created", 400);
    }

    responseNormal(res, {}, "product created", 201);
  } catch (error) {
    responseError(res, "error", 500);
  }
};

export const categoriesDelController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const isDeleted = await CategoriesService.delete(id);

    if (!isDeleted) {
      responseError(res, "error to deleted category", 400);
    }

    responseNormal(res, {}, "product deleted", 200);
  } catch (error) {
    responseError(res, "error to deleted", 500);
  }
};

export const categoriesRowController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productRow = await CategoriesService.findCategories();

    if (productRow.length <= 0) {
      responseError(res, "error to found categories", 404);
    }

    responseNormal(res, productRow, "products found", 200);
  } catch (error) {
    responseError(res, "error", 500, error);
  }
};

export const categoriesOneController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const productOne = await CategoriesService.findCategory(id);

    if (!productOne) {
      responseError(res, "error to found category", 404);
    }

    responseNormal(res, productOne, "product found", 200);
  } catch (error) {
    responseError(res, "error", 500, error);
  }
};
