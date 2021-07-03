import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = (req.session.loggedIn) ? true : false;
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: {
    fileSize: 3000000,
  },
});

export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: {
    fileSize: 10000000,
  },
});