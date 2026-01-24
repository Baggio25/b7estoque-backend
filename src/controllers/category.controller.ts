import { RequestHandler } from "express";
import {
  categoryIdSchema,
  createCategorySchema,
  listCategorySchema,
} from "../validators/category.validator";
import * as categoryService from "../services/category.service";
import { AppError } from "../utils/app.error";

export const createCategory: RequestHandler = async (req, res) => {
  const data = createCategorySchema.parse(req.body);
  const category = await categoryService.createCategory(data);

  res.status(201).json({ error: null, data: category });
};

export const listCategories: RequestHandler = async (req, res) => {
  const { includeProductCount } = listCategorySchema.parse(req.query);
  const categories = await categoryService.listCategories(includeProductCount);

  res.status(200).json({ error: null, data: categories });
};

export const getCategoryById: RequestHandler = async (req, res) => {
  const { id } = categoryIdSchema.parse(req.params);
  const category = await categoryService.getCategoryById(id);
  if (!category) throw new AppError("Categoria não encontrada", 404);

  res.status(200).json({ error: null, data: category });
};