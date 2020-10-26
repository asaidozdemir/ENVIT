var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const role_is = require('../public/javascripts/role_que.js');
const cookie_monster = require('../public/javascripts/cookie_monster.js');
const refresher = require('../public/javascripts/refresher');

/* GET to useradd page. */
router.get('/', function (req, res, next) {


  cookie_monster(req, res, next);

  if (req.session.mysession) {
    if (req.cookies._krol == role_is('admin_role')) {
      refresher(req, res, next);

      res.render('useradd', { title: 'useradd' });
    }
    else {
      refresher(req, res, next);
      res.render('main', { hata: "Bu sayfaya erişiminiz yoktur" });
    }
  }
  else {
    req.session.destroy();
    res.render('index', { hata: "Timeout" });
  }
});

module.exports = router;