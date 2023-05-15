import { Router } from "express";
import routerGames from "./games.routes.js";
import customersRouter from "./customers.routes.js";
import rentalRouter from "./rentals.routes.js";

const routes = Router();

routes.use(routerGames);
routes.use(customersRouter);
routes.use(rentalRouter);

export default (routes);