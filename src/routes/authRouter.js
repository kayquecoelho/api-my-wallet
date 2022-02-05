import { Router } from "express";
import { login, registrateUser } from "../controllers/authController.js";
import { validateLoginSchemaMiddleware } from "../middlewares/validateLoginSchemaMiddleware.js";
import { validateUserSchemaMiddleware } from "../middlewares/validateUserSchemaMiddleware.js";

const authRouter = Router();

authRouter.post("/sign-up", validateUserSchemaMiddleware, registrateUser);
authRouter.post("/sign-in", validateLoginSchemaMiddleware, login);

export default authRouter;