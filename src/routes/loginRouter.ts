import { Router } from "express";
import { loginController, validTokenController } from "../controllers/login";

const loginRouter = Router();

loginRouter.post("/create", loginController);
loginRouter.post("/valid", validTokenController);

export { loginRouter };
