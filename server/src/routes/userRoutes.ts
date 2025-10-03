import { Router } from "express";
import { getAllErrorCodeName } from "../controllers/userController";

const userRouter=Router();

userRouter.get('/getAllErroCodes',getAllErrorCodeName);

export default userRouter;