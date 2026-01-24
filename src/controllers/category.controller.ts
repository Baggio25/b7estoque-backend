import { RequestHandler } from "express";
import {
  createCategorySchema,
  listCategorySchema,
} from "../validators/category.validator";
import * as categoryService from "../services/category.service";

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