import express from "express";
import { loggedInOnlyMiddleware, videoOwnerOnlyMiddleware, videoUpload } from "../middleware"
import { watch, search, getEditVideo, postEditVideo, videoDelete } from "../Controllers/videoController"

const videoRouter = express.Router();

videoRouter.get("/search", search);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(loggedInOnlyMiddleware, videoOwnerOnlyMiddleware).get(getEditVideo).post(videoUpload.single("thumb"), postEditVideo);
videoRouter.get("/:id([0-9a-f]{24})/delete", loggedInOnlyMiddleware, videoOwnerOnlyMiddleware, videoDelete);

export default videoRouter;