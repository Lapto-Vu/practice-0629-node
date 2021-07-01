import express from "express";
import { logout, profile } from "../Controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/:id", profile);

export default userRouter;