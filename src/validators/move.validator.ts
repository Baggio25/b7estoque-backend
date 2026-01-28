import z from "zod";

const moveTypeEnum = z.enum(["in", "out"]);

export const createMoveSchema = z.object({
  productId: z.uuid("Formato de ID de produto inválido"),
  type: moveTypeEnum,
  quantity: z.coerce
    .number()
    .positive("Quantidade deve ser positiva")
    .transform(String),
});

export type listMovesInput = z.infer<typeof listMovesSchema>;
export const listMovesSchema = z.object({
  productId: z.uuid("Formato de ID de produto inválido").optional(),
  offset: z.coerce.number().int().min(0).default(0),
  limit: z.coerce.number().int().min(1).default(10),
});