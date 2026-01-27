import { RequestHandler } from "express";
import {
  createProductSchema,
  listProductsSchema,
} from "../validators/product.validator";
import * as productService from "../services/product.service";

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