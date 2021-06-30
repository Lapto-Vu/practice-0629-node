import express from "express";
import { home, search } from "../controllers/videoController";
import { login, join } from "../Controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/login", login);
rootRouter.get("/join", join);
rootRouter.get("/search", search);

export default rootRouter;