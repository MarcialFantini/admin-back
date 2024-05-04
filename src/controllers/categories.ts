import { NextFunction, Request, Response } from "express";
import { CategoriesService } from "../services/Categories";
import { CategoriesInterface } from "../DB/models/Categories";
import { responseNormal } from "../utils/responseNormal";

export const categoriesCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = req.body as unknown as CategoriesInterface;

    const isCreatedCategory = await CategoriesService.Create(category);

    if (!isCreatedCategory) {
      res.status(400).json({ message: "category not created", code: 400 });
    }

    return responseNormal(res, {}, "category created", 201);
  } catch (error) {
    res.status(500).json({ message: "error", code: 500 });
  }
};

export const categoriesDelController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    await CategoriesService.delete(id);

    return res.json({ message: "product deleted", code: 200 }).status(200);
  } catch (error) {
    return res.status(500).json({ message: "error to deleted", code: 500 });
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
      return res
        .status(404)
        .json({ message: "error to found categories", code: 404 });
    }
    // return res
    //   .status(200)
    //   .json({ message: "products found", data: productRow, code: 200 });

    return responseNormal(res, productRow, "products found", 200);
  } catch (error) {
    return res.status(200).json({ message: "error", code: 500 });
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
      return res
        .status(404)
        .json({ message: "error to found category", code: 404 });
    }

    return res.status(200).json({ message: "products found", code: 200 });
  } catch (error) {
    return res.status(500).json({ message: "error", code: 500, error });
  }
};
