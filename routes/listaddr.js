var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const role_is = require('../public/javascripts/role_que.js');
const cookie_monster = require('../public/javascripts/cookie_monster.js');
const refresher = require('../public/javascripts/refresher');

/* POST to list page after insertion. */
router.post('/', function (req, res, next) {
  cookie_monster(req, res, next);

  if (req.session.mysession) {

    if ((req.cookies._krol == role_is('user_role')) || (req.cookies._krol == role_is('admin_role')) || (req.cookies._krol == role_is('campus_role'))) {
      refresher(req, res, next);

      var p2 = req.body.pType;
      var p3 = req.body.pName;
      var p4 = req.body.pBrand;
      var p5 = req.body.responsible;
      var p6 = req.body.Date;
      var p7 = req.body.Detail;
      var p8 = req.body.garanti_start;
      var p9 = req.body.garanti_end;
      var p10 = req.body.unit;
      var p11 = req.body.campus;

      p2 = p2.slice(0, 64);
      p3 = p3.slice(0, 64);
      p4 = p4.slice(0, 64);
      p5 = p5.slice(0, 64);
      p6 = p6.slice(0, 64);
      p7 = p7.slice(0, 128);
      p8 = p8.slice(0, 64);
      p9 = p9.slice(0, 64);
      p10 = p10.slice(0, 64);
      p11 = p11.slice(0, 64);

      var dgiven1 = Date.parse("1900-01-01");   //min date
      var dgiven2 = Date.parse("2999-12-31");   //max date

      var dtaken = Date.parse(p6);    //taken date

      if (dtaken < dgiven1) {
        p6 = "1900-01-01";
      }
      else if (dtaken > dgiven2) {
        p6 = "2999-12-31";
      }

      var dtaken = Date.parse(p8);    //taken date

      if (dtaken < dgiven1) {
        p8 = "1900-01-01";
      }
      else if (dtaken > dgiven2) {
        p8 = "2999-12-31";
      }

      var dtaken = Date.parse(p9);    //taken date

      if (dtaken < dgiven1) {
        p9 = "1900-01-01";
      }
      else if (dtaken > dgiven2) {
        p9 = "2999-12-31";
      }

      var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'ITman',
        password: 'Kernel1070',
        database: 'inventory'
      });

      connection.connect(function (err) {
        if (err) console.log(err);

        var auth = "INSERT INTO list ( pType, pName, pBrand, responsible , Date, Detail, garanti_start, garanti_end, Unit, Campus) VALUES ?";
        var values = [
          [p2, p3, p4, p5, p6, p7, p8, p9, p10, p11]
        ];

        connection.query(auth, [values], function (err, result) {
          if (err) { console.log(err); }
          else {
            console.log(result.affectedRows + " Record added");
            connection.end(function (err) {
              res.redirect('/list');
              if (err) console.log(err);
            });
          }
        });
      });
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