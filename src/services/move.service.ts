import { NewMove } from "../db/schema";

export const addMove = async (data: Omit<NewMove, "unitPrice">) => {};
