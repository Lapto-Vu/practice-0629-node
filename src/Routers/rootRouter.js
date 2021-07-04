import express from "express";
import { home, search } from "../Controllers/videoController";
import { getLogin, postLogin, getJoin, postJoin } from "../Controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/join").get(getJoin).post(postJoin)
rootRouter.get("/search", search);

export default rootRouter;