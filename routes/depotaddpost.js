var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const role_is = require('../public/javascripts/role_que.js');
const cookie_monster = require('../public/javascripts/cookie_monster.js');
const refresher = require('../public/javascripts/refresher');

/* POST to add page. */
router.post('/', function (req, res, next) {

  cookie_monster(req, res, next);

  if (req.session.mysession) {
    
    var addinfo = req.body.addinfo;

    if ((req.cookies._krol == role_is('user_role')) || (req.cookies._krol == role_is('admin_role')) || (req.cookies._krol == role_is('campus_role'))) {
      refresher(req, res, next);

      var testObj = '{"pType":"' + addinfo + '"}';

      res.render('depotadd', { "testObj": testObj });
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