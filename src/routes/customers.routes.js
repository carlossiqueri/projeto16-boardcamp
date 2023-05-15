import { Router } from "express";
import {
  postCustomers,
  getCustomers,
  getCustomersById,
} from "../controllers/customers.controllers.js";
import {
  customerMiddleware,
  customerByIdMiddleware,
  updateCustomer,
} from "../middlewares/customers.middleware.js";

const customersRouter = Router();

customersRouter.post("/customers", customerMiddleware, postCustomers);
customersRouter.get("/customers", getCustomers);
customersRouter.get("/customes/:id", customerByIdMiddleware, getCustomersById);
customersRouter.put(
  "/customers/:id",
  customerByIdMiddleware,
  customerMiddleware,
  updateCustomer
);

export default customersRouter;
