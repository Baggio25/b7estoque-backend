import z from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(255),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(255).optional(),
});

export const listCategorySchema = z.object({
  includeProductCount: z.coerce.boolean().optional().default(false),
});

export const categoryIdSchema = z.object({
  id: z.uuid("Formato do ID da categoria inválido"),
});
