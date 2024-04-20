import { Categories, CategoriesInterface } from "../DB/models/Categories";

export class CategoriesService {
  static async Create(categories: CategoriesInterface) {
    await Categories.create(categories);

    return true;
  }

  static async delete(id: string) {
    const categoriesDeleted = await Categories.destroy({ where: { id } });
    return categoriesDeleted <= 0;
  }

  static async findCategory(id: string) {
    const categories = await Categories.findByPk(id);

    return categories;
  }

  static async findCategories() {
    const categories = await Categories.findAll({ limit: 20 });
    return categories;
  }
}
