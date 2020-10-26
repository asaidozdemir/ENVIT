var express = require('express');
var router = express.Router();
const cookie_monster = require('../public/javascripts/cookie_monster.js');
const refresher = require('../public/javascripts/refresher');

/* GET home (index) page. */
router.get('/', function (req, res, next) {

  if (req.session.mysession) {
    cookie_monster(req, res, next);
    refresher(req, res, next);
    res.render('main', { title: 'Index' });
  }

  else {
    req.session.destroy();
    res.clearCookie('_krol');
    res.clearCookie('_kcam');
    res.clearCookie('connect.sid');
    cookie_monster(req, res, next);
    res.render('index');
  }

});

module.exports = router;