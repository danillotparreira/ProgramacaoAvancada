import { Router } from "express";
import { CheckingAccountController } from "../controllers/CheckingAccountController";
import { StatementController } from "../controllers/StatementController";

const router = Router();
const checkingAccountController = new CheckingAccountController();
const statementController = new StatementController();

router.get("/", checkingAccountController.findAll);
router.get("/:id", checkingAccountController.findById);
router.get("/name", checkingAccountController.findByName);
router.post("/", checkingAccountController.create);
router.put("/:id", checkingAccountController.verifyIfExists, checkingAccountController.update);
router.delete("/:id", checkingAccountController.verifyIfExists, checkingAccountController.delete);

router.post("/:id/deposit", checkingAccountController.verifyIfExists, statementController.deposit);
router.post("/:id/withdraw", checkingAccountController.verifyIfExists, statementController.withdraw);
router.get("/:id/pix", checkingAccountController.verifyIfExists, statementController.pix);
router.get("/:id/balance", checkingAccountController.verifyIfExists, statementController.balance);
router.get("/:id/statement", checkingAccountController.verifyIfExists, statementController.getStatement);

export default router;
