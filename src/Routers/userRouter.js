import express from "express";
import { videoUpload, avatarUpload, loggedInOnlyMiddleware, userItselfOnlyMiddleware } from "../middleware"
import { getChangePassword, postChangePassword, logout, getProfile, postProfile } from "../Controllers/userController";
import { board, getVideoUpload, postVideoUpload } from "../Controllers/videoController"

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/:id([0-9a-f]{24})", board);
userRouter.route("/:id([0-9a-f]{24})/profile").all(loggedInOnlyMiddleware, userItselfOnlyMiddleware).get(getProfile).post(avatarUpload.single("avatar"), postProfile);
userRouter.route("/:id([0-9a-f]{24})/change-password").all(loggedInOnlyMiddleware, userItselfOnlyMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.route("/:id([0-9a-f]{24})/video-upload").all(loggedInOnlyMiddleware, userItselfOnlyMiddleware).get(getVideoUpload).post(videoUpload.fields([{ name: "video" }, { name: "thumb" }]), postVideoUpload)

export default userRouter;