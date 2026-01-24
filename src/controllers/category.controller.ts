import { RequestHandler } from "express";
import { createCategorySchema } from "../validators/category.validator";
import * as categoryService from "../services/category.service";
import { error } from "console";

export const createCategory: RequestHandler = async (req, res) => {
  const data = createCategorySchema.parse(req.body);
  const category = await categoryService.createCategory(data);

  res.status(201).json({ error: null, data: category });
};
