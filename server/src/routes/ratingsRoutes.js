import { Router } from "express";
import { getRatingsController } from "../controllers/ratingsController.js";

const ratingsRouter = Router();

ratingsRouter.get('/:id', getRatingsController);


export default ratingsRouter;