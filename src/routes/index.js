import { Router } from "express";
import authRouter from "./authRouter.js";
import transactionsRouter from "./transactionsRouter.js";

const router = Router();

router.use(authRouter);
router.use(transactionsRouter);

export default router;