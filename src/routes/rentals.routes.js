import { Router } from "express";
import { postRental } from "../controllers/rentals.controllers.js";
import { rentalMiddleware } from "../middlewares/rentals.middlewares.js";

const rentalRouter = Router();

rentalRouter.post("/rentals", rentalMiddleware, postRental);

export default rentalRouter;