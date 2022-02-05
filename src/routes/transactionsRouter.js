import { Router } from "express";
import { getTransactions, registrateTransaction } from "../controllers/transactionsController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { validateTransactionSchemaMiddleware } from "../middlewares/validateTransactionSchemaMiddleware.js";

const transactionsRouter = Router();

transactionsRouter.get("/transactions", validateTokenMiddleware, getTransactions);
transactionsRouter.post("/transactions", validateTokenMiddleware, validateTransactionSchemaMiddleware, registrateTransaction);

export default transactionsRouter;