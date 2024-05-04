import { Op } from "sequelize";
import { Categories } from "../DB/models/Categories";
import { Product, ProductInterface } from "../DB/models/products";

export class ProductService {
  static async createProduct(product: ProductInterface) {
    console.log(product);
    const productCreated = await Product.create(product);
    return productCreated;
  }

  static async patchProduct(product: ProductInterface, id: string) {
    const updateProduct = await Product.update(product, { where: { id } });
    return updateProduct[0] > 0;
  }

  static async delProduct(id: string) {
    const delProduct = await Product.destroy({
      where: {
        id,
      },
    });
    return delProduct;
  }

  static async getProductRow(offset: number, page: number) {
    const productsList = await Product.findAll({
      limit: offset,
      offset: page > 0 ? page * offset : 0,
    });
    return productsList;
  }

  static async getOneProductById(id: string) {
    const productById = await Product.findByPk(id);
    return productById;
  }

  static async getProductsByCategory(idCategory: string, offset: number) {
    const productsCategories = await Categories.findByPk(idCategory, {
      include: [{ model: Product, limit: offset, as: "products" }],
    });
    return productsCategories;
  }

  static async getProductsByName(name: string) {
    const productsByName = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });

    return productsByName;
  }
}
