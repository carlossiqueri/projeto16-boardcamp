import { Router } from "express";
import { getGames, postGames } from "../controllers/games.controllers.js";
import gamesMiddleware from "../middlewares/games.middleware.js";
const routerGames = Router();

routerGames.get("/games", getGames);
routerGames.post("/games",gamesMiddleware, postGames);

export default routerGames;
