export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = (req.session.loggedIn) ? true : false;
  res.locals.loggedInUser = req.session.user || {};
  next();
};