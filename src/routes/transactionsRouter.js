import { Router } from "express";
import { getTransactions } from "../controllers/transactionsController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const transactionsRouter = Router();

transactionsRouter.get("/transactions", validateTokenMiddleware, getTransactions);

export default transactionsRouter;