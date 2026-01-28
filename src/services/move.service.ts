import { and, eq, isNull } from "drizzle-orm";
import { db } from "../db/connection";
import { moves, NewMove, products } from "../db/schema";
import { AppError } from "../utils/app.error";

export const addMove = async (data: Omit<NewMove, "unitPrice">) => {
  return await db.transaction(async (tx) => {
    const productResults = await tx
      .select({
        quantity: products.quantity,
        unitPrice: products.unitPrice,
      })
      .from(products)
      .where(and(eq(products.id, data.productId), isNull(products.deletedAt)))
      .for("update");

    if (productResults.length === 0) {
      throw new AppError("Produto não encontrado");
    }

    const currentQty = parseFloat(productResults[0].quantity);
    const moveQty = parseFloat(data.quantity ?? "0");

    if (data.type === "out") {
      if (currentQty < moveQty) {
        throw new AppError(
          `Estoque insuficiente. Disponível: ${currentQty}, solicitado: ${moveQty}`,
          400,
        );
      }
    }

    const unitPrice = productResults[0].unitPrice;
    const result = await tx
      .insert(moves)
      .values({ ...data, unitPrice })
      .returning();

    const move = result[0];

    const newQty =
      data.type === "in" ? currentQty + moveQty : currentQty - moveQty;

    await tx
      .update(products)
      .set({ quantity: newQty.toString(), updatedAt: new Date() })
      .where(eq(products.id, data.productId));

    return move;
  });
};
