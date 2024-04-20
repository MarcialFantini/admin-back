import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/products";
import { ProductInterface } from "../DB/models/products";
import { responseError, responseNormal } from "../utils/responseNormal";

export const CreateProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = req.body as ProductInterface;
    const isNewProductCreated = await ProductService.createProduct(product);

    if (!isNewProductCreated) {
      return responseError(res, "product not created", 400);
    }

    return responseNormal(res, {}, "product created", 200);
  } catch (error) {
    console.log(error);
    return responseError(res, "error", 500);
  }
};

export const UpdateProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const productValuesUpdate = req.body as ProductInterface;
    const isProductUpdate = await ProductService.patchProduct(
      productValuesUpdate,
      id
    );
    if (!isProductUpdate) {
      responseError(res, "error to update product", 400);
    }
    return responseNormal(res, {}, "product update", 200);
  } catch (error) {
    return responseError(res, "error", 500);
  }
};

export const DelProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const isProductDeleted = await ProductService.delProduct(id);

    if (!isProductDeleted) {
      responseError(res, "product not deleted", 400);
    }

    return responseError(res, "product deleted", 200);
  } catch (error) {
    return responseError(res, "product not deleted", 500);
  }
};

export const GetPageProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = req.params.page as unknown as number;
    const offset = req.params.offset as unknown as number;

    const productList = await ProductService.getProductRow(offset, page);

    if (productList.length <= 0) {
      return responseError(res, "error to get products", 404, []);
    }
    return responseNormal(res, productList, "products found", 200);
  } catch (error) {
    return responseError(res, "error", 500);
  }
};

export const GetProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const productFinned = await ProductService.getOneProductById(id);

    if (!productFinned) {
      return responseError(res, "error to found product", 404);
    }
    return responseNormal(res, productFinned, "found product", 200);
  } catch (error) {
    return responseError(res, "error", 500);
  }
};
