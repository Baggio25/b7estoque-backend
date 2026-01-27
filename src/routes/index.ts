import { Router, Request, Response } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import categoryRoutes from "./category.routes";
import productRoutes from "./product.routes";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    res.json({ pong: true });
});

router.use('/auth', authRoutes);

router.use(authMiddleware);

router.use('/users', userRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);

export default router;