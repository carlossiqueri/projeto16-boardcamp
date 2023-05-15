import { Router } from "express";
import {
  postCustomers,
  getCustomers,
  getCustomersById,
  updateCustomer,
} from "../controllers/customers.controllers.js";
import {
  customerMiddleware,
  customerByIdMiddleware,
} from "../middlewares/customers.middleware.js";

const customersRouter = Router();

customersRouter.post("/customers", customerMiddleware, postCustomers);
customersRouter.get("/customers", getCustomers);
customersRouter.get("/customes/:id", customerByIdMiddleware, getCustomersById);
customersRouter.put(
  "/customers/:id",
  customerMiddleware,
  updateCustomer
);

export default customersRouter;
