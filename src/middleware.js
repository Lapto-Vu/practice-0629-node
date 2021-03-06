import multer from "multer";
import multerS3 from "multer-s3";
import Video from "./models/Video";
import User from "./models/User";
import Comment from "./models/Comment";
import aws from "aws-sdk"

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const s3ImageUploader = multerS3({
  s3: s3,
  bucket: "foxview/images",
  acl: "public-read",
});

const s3VideoUploader = multerS3({
  s3: s3,
  bucket: "foxview/videos",
  acl: "public-read",
});


export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = (req.session.loggedIn) ? true : false;
  res.locals.loggedInUser = req.session.user;
  next();
};

export const loggedInOnlyMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("info", "접근 할 수 없는 경로입니다. 먼저 로그인 하십시오.");
    return res.redirect("/");
  }
};


export const userItselfOnlyMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (req.session.user._id==user._id) {
    return next();
  } else {
    req.flash("info", "사용자 페이지에 대한 권한이 없습니다. 접근 할 수 없습니다.");
    return res.redirect("/");
  }
};


export const commentOwnerOnlyMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findById(id).populate("owner");
  if (req.session.user._id==comment.owner._id) {
    return next();
  } else {
    req.flash("info", "댓글에 대한 권한이 없습니다. 접근 할 수 없습니다.");
    return res.redirect("/");
  }
};


export const videoOwnerOnlyMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner");
  if (req.session.user._id==video.owner._id) {
    return next();
  } else {
    req.flash("info", "비디오에 대한 권한이 없습니다. 접근 할 수 없습니다.");
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000,
  },
  storage: s3ImageUploader,
});

export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 10000000,
  },
  storage: s3VideoUploader,
});