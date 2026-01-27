import { db } from "../db/connection";
import { NewProduct, products } from "../db/schema";

import * as categoryService from "../services/category.service";
import { AppError } from "../utils/app.error";

export const createProduct = async (data: NewProduct) => {
  const category = await categoryService.getCategoryById(data.categoryId);
  if (!category) throw new AppError("Categoria não encontrada", 404);

  const result = await db.insert(products).values(data).returning();

  if (!result[0]) return null;
  return result[0];
};
