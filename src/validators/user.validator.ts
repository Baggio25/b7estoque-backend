import z from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3, 'Nome é obrigatório').max(255),
  email: z.email('E-mail está com formato inválido').min(6, 'E-mail é obrigatório'),
  pasword: z.string().min(6, 'Senha é obrigatória'),
})