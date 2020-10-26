module.exports = function (req, res, next) {
  res.clearCookie('CUID');
  res.clearCookie('CID');
  res.clearCookie('CDID');
  res.clearCookie('CGID');
  return function (req, res, next) {
    next()
  }
}