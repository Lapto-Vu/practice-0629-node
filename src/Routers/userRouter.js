import express from "express";
import { videoUpload, avatarUpload } from "../middleware"
import { getChangePassword, postChangePassword, logout, getProfile, postProfile } from "../Controllers/userController";
import { board, getVideoUpload, postVideoUpload } from "../Controllers/videoController"

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/:id", board);
userRouter.route("/:id/profile").get(getProfile).post(avatarUpload.single("avatar"), postProfile);
userRouter.route("/:id/change-password").get(getChangePassword).post(postChangePassword);
userRouter.route("/:id/video-upload").get(getVideoUpload).post(videoUpload.fields([{ name: "video" }, { name: "thumb" }]), postVideoUpload)

export default userRouter;