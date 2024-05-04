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
      return res
        .status(400)
        .json({ code: 400, message: "product not created" });
    }

    return res.status(201).json({ code: 201, message: "product created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error", code: 500 });
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
      res.status(400).json({ code: 400, message: "error to update product" });
    }
    return res.status(200).json({ message: "product update", code: 200 });
  } catch (error) {
    return res.status(500).json({ message: "error", code: 500 });
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
      res.status(400).json({ message: "product not deleted", code: 400 });
    }

    return res.status(200).json({ message: "product deleted", code: 200 });
  } catch (error) {
    return res.status(500).json({ message: "product not deleted", code: 500 });
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
      return res
        .status(404)
        .json({ message: "error to get products", code: 404 });
    }
    return res
      .status(200)
      .json({ message: "products found", data: productList, code: 200 });
  } catch (error) {
    return res.status(500).json({ message: "error", code: 500 });
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
      return res
        .status(404)
        .json({ message: "error to found product", code: 404 });
    }
    return res.status(200).json({ message: "found product", code: 200 });
  } catch (error) {
    return res.json({ message: "error", code: 500 });
  }
};

export const GetProductByNameController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.params.name;

    const products = await ProductService.getProductsByName(name);

    return responseNormal(res, products, "products found by name", 200);
  } catch (error) {
    return responseError(res, "error to found products by name", 500);
  }
};
