var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const cookie_monster = require('../public/javascripts/cookie_monster.js');
const campuslist = require('../public/javascripts/campuslist.js');

/* GET to add page. */
router.get('/', function (req, res, next) {
  cookie_monster(req, res, next);

  if (req.session.mysession) {
    console.log('Session Ends:  ', req.session.id);
    res.clearCookie('_krol');
    res.clearCookie('_kcam');
    res.clearCookie('connect.sid');
    cookie_monster(req, res, next);
    req.session.destroy();
    res.render('index', { hata: "Logged Out" });
  }
  else {
    req.session.destroy();
    res.clearCookie('_krol');
    res.clearCookie('_kcam');
    res.clearCookie('connect.sid');
    cookie_monster(req, res, next);
    res.render('index', { hata: "Logged Out" });
  }
});

module.exports = router;