var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const cookie_monster = require('../public/javascripts/cookie_monster.js');
const refresher = require('../public/javascripts/refresher');

/* GET to about page. */
router.get('/', function (req, res, next) {
  cookie_monster(req, res, next);
  var ms = 60 * 60 * 1000;
  req.session.cookie.expires = new Date(Date.now() + ms);
  req.session.cookie.maxAge = ms;
  res.render('about', { title: 'About' });
});

module.exports = router;