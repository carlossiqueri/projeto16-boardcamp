import { Router } from "express";
import { postRental } from "../controllers/rentals.controllers";
import { rentalMiddleware } from "../middlewares/rentals.middlewares";

const rentalRouter = Router();

rentalRouter.post("/rentals", rentalMiddleware, postRental);

export default rentalRouter;