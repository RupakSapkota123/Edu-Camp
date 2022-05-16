// create middleware to store the redirect url in session
const storeRedirectToInSession = (req, res, next) => {
  req.session.redirectTo = req.query.redirectTo;
  next();
};

export default storeRedirectToInSession;
