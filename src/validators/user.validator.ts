import z from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, "Nome deve conter pelo menos 3 dígitos").max(255),
  email: z
    .email("E-mail está com formato inválido")
    .min(6, "E-mail deve conter pelo menos 6 dígitos"),
  password: z.string().min(6, "Senha deve conter pelo menos 6 dígitos"),
});

export const listUsersSchema = z.object({
  offset: z.coerce.number().int().min(0).optional().default(0),
  limit: z.coerce.number().int().min(1).optional().default(10),
});

export const userIdSchema = z.object({
  id: z.uuid("Formato de ID do usuário inválido"),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve conter pelo menos 3 dígitos")
    .max(255)
    .optional(),
  email: z
    .email("E-mail está com formato inválido")
    .min(6, "E-mail deve conter pelo menos 6 dígitos")
    .optional(),
  password: z
    .string()
    .min(6, "Senha deve conter pelo menos 6 dígitos")
    .optional(),
  isAdmin: z.boolean().optional(),
  avatar: z.string().nullable().optional(),
});