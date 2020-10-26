var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const role_is = require('../public/javascripts/role_que.js');
const passhash = require('../public/javascripts/passhash.js');
const cookie_monster = require('../public/javascripts/cookie_monster.js');
const refresher = require('../public/javascripts/refresher');

/* POST to useradd page. */
router.post('/', function (req, res, next) {
  cookie_monster(req, res, next);

  if (req.session.mysession) {
    if (req.cookies._krol == role_is('admin_role')) {
      refresher(req, res, next);

      var p1 = req.body.newuser;
      var p2 = req.body.pswrd;

      p2 = passhash(p2);

      var p3 = req.body.email;
      var p4 = req.body.role;
      var p5 = req.body.campus;

      p1 = p1.slice(0, 64);
      p2 = p2.slice(0, 64);
      p3 = p3.slice(0, 64);
      p4 = p4.slice(0, 64);
      p5 = p5.slice(0, 64);

      switch (p4) {
        case 'Admin':
          p4 = 'admin_role'
          break;
        case 'User':
          p4 = 'user_role'
          break;
        case 'Campus':
          p4 = 'campus_role'
          break;
        case 'Guset':
          p4 = 'guest_role'
          break;
        default:
          p4 = 'guest_role'
      }

      var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'ITman',
        password: 'Kernel1070',
        database: 'inventory'
      });

      connection.connect(function (err) {
        if (err) console.log(err);

        var auth = "INSERT INTO usertab ( username, password, mail, role, campus) VALUES ?";
        var values = [
          [p1, p2, p3, p4, p5]
        ];

        connection.query(auth, [values], function (err, result) {
          if (err) { console.log(err); }
          else {
            console.log(result.affectedRows + " User added");
            connection.end(function (err) {
              res.redirect('/adminpanel');
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