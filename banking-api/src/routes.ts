import { Router } from "express";
import userRoutes from "./routes/UserRoutes";
import checkingAccountRoutes from "./routes/CheckingAccountRoutes";
import authRoutes from "./routes/AuthRoutes";
import { AuthController } from "./controllers/AuthController";

const router = Router();
const authController = new AuthController();

router.use("/users", authController.authMiddleware, userRoutes);
router.use("/checkingaccounts", authController.authMiddleware, checkingAccountRoutes);
router.use("/auth", authRoutes);

export { router };
