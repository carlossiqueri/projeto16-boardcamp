import { Router } from "express";
import routerGames from "./games.routes.js";
import customersRouter from "./customers.routes.js";

const routes = Router();

routes.use(routerGames);
routes.use(customersRouter);

export default (routes);