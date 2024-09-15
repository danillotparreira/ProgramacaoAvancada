import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.get("/",  userController.findAll);
router.get("/:id",  userController.verifyIfExists, userController.findById);
router.post("/",  userController.create);
router.put("/:id",  userController.verifyIfExists, userController.update);
router.delete("/:id",  userController.verifyIfExists, userController.delete);

export default router;