import { Router } from "express";
import { CustomerController } from "./controllers/CustomerController";

const routes = Router();
const customerController = new CustomerController();

routes.get("/customers", customerController.findAll);
routes.post("/customers", customerController.create);
routes.get("/customers/:id", customerController.findById);
routes.put("/customers/:id", customerController.verifyIfExists, customerController.update);
routes.delete("/customers/:id", customerController.verifyIfExists, customerController.delete);

export { routes };