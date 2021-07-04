import express from "express";
import { loggedInOnlyMiddleware, videoOwnerOnlyMiddleware, videoUpload } from "../middleware"
import { watch, getEditVideo, postEditVideo, videoDelete } from "../Controllers/videoController"

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(loggedInOnlyMiddleware, videoOwnerOnlyMiddleware).get(getEditVideo).post(videoUpload.single("thumb"), postEditVideo);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(loggedInOnlyMiddleware, videoOwnerOnlyMiddleware).get(videoDelete);

export default videoRouter;