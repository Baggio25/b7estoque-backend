import { RequestHandler } from "express";
import { createMoveSchema } from "../validators/move.validator";
import { AppError } from "../utils/app.error";

import * as moveService from "../services/move.service";

export const addMove: RequestHandler = async (req, res) => {
  if (!req.user) throw new AppError("Não autorizado", 401);

  const data = createMoveSchema.parse(req.body);
  const move = await moveService.addMove({ ...data, userId: req.user.id });

  res.status(201).json({ error: null, data: move });
};
