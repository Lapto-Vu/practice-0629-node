import express from "express";
import { loggedInOnlyMiddleware, commentOwnerOnlyMiddleware } from "../middleware";
import { registerView, createComment, deleteComment } from "../Controllers/videoController"

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", loggedInOnlyMiddleware, createComment);
apiRouter.delete("/comment/:id([0-9a-f]{24})/delete", loggedInOnlyMiddleware, commentOwnerOnlyMiddleware, deleteComment)

export default apiRouter;