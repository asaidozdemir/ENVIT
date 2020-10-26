module.exports = function (req, res, next) {

  console.log('Session Info:  ', req.session.id);

  var ms = 60 * 60 * 1000;

  req.session.cookie.expires = new Date(Date.now() + ms);
  req.session.cookie.maxAge = ms;

  req.cookies._krol.expires = new Date(Date.now() + ms);
  req.cookies._krol.maxAge = ms;

  if (req.cookies._kcam) {
    req.cookies._kcam.expires = new Date(Date.now() + ms);
    req.cookies._kcam.maxAge = ms;
  }

  return function (req, res, next) {
    next()
  }
}