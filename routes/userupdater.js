var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const role_is = require('../public/javascripts/role_que.js');
const passhash = require('../public/javascripts/passhash.js');
const cookie_monster = require('../public/javascripts/cookie_monster.js');
const refresher = require('../public/javascripts/refresher');

/* POST to userupdate page. */
router.post('/', function (req, res, next) {

  if (req.session.mysession) {
    if (req.cookies._krol == role_is('admin_role')) {
      refresher(req, res, next);

      var changeuid = req.cookies.CUID;

      var p2 = req.body.pswrd;

      p2 = passhash(p2);
      
      var p3 = req.body.email;
      var p4 = req.body.role;
      var p5 = req.body.campus;
      var p6 = req.body.active;

      p2 = p2.slice(0, 64);
      p3 = p3.slice(0, 64);
      p4 = p4.slice(0, 64);
      p5 = p5.slice(0, 64);

      if(p6==1){p6=1}
      else{p6=0}

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

        var auth = "UPDATE usertab SET password = ?, mail = ? , role = ?, campus = ?, active = ? WHERE username = ?";

        connection.query(auth, [p2, p3, p4, p5, p6, changeuid], function (err, result) {
          if (err) { console.log(err); }
          else {
            cookie_monster(req, res, next);
            console.log(result.affectedRows + " Record changed");
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