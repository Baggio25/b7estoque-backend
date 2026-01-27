import { RequestHandler } from "express";
import {
  createProductSchema,
  getProductByIdSchema,
  listProductsSchema,
} from "../validators/product.validator";
import * as productService from "../services/product.service";
import { AppError } from "../utils/app.error";

export const createProduct: RequestHandler = async (req, res) => {
  const data = createProductSchema.parse(req.body);
  const product = await productService.createProduct(data);

  res.status(201).json({ error: null, data: product });
};

export const listProducts: RequestHandler = async (req, res) => {
  const { limit, offset, name } = listProductsSchema.parse(req.query);
  const products = await productService.listProducts(offset, limit, name);

  res.status(200).json({ error: null, data: products });
};

export const getProductById: RequestHandler = async (req, res) => {
  const { id } = getProductByIdSchema.parse(req.params);
  const product = await productService.getProductByIdWithDetails(id);
  if (!product) throw new AppError("Produto não encontrado", 404);

  res.status(200).json({ error: null, data: product });
};