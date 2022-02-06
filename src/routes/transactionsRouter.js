import { Router } from 'express';
import {
  deleteTransaction,
  getTransactions,
  registrateTransaction,
  updateTransaction,
} from '../controllers/transactionsController.js';
import { validateIDMiddleware } from '../middlewares/validateIDMiddleware.js';
import { validateTokenMiddleware } from '../middlewares/validateTokenMiddleware.js';
import { validateTransactionSchemaMiddleware } from '../middlewares/validateTransactionSchemaMiddleware.js';

const transactionsRouter = Router();

transactionsRouter.get(
  '/transactions',
  validateTokenMiddleware,
  getTransactions
);
transactionsRouter.post(
  '/transactions',
  validateTokenMiddleware,
  validateTransactionSchemaMiddleware,
  registrateTransaction
);
transactionsRouter.delete(
  '/transactions/:id',
  validateTokenMiddleware,
  validateIDMiddleware,
  deleteTransaction
);
transactionsRouter.put(
  '/transactions/:id',
  validateTokenMiddleware,
  validateTransactionSchemaMiddleware,
  validateIDMiddleware,
  updateTransaction
);

export default transactionsRouter;
