var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const role_is = require('../public/javascripts/role_que.js');
const cookie_monster = require('../public/javascripts/cookie_monster.js');
const refresher = require('../public/javascripts/refresher');

/* POST to adminpanel page. */
router.post('/', function (req, res, next) {
  cookie_monster(req, res, next);

  if (req.session.mysession) {

    if (req.cookies._krol == role_is('admin_role')) {
      refresher(req, res, next);


      var order = req.body.orderinfo;
      order = order.slice(0, 64);

      var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'ITman',
        password: 'Kernel1070',
        database: 'inventory'
      });
      var personList = [];
      connection.connect();
      var auth = 'SELECT * FROM usertab ORDER BY ';
      connection.query(auth + order, function (err, rows, fields) {
        if (err) {
          res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
        }
        else {
          for (var i = 0; i < rows.length; i++) {
            var clearence = rows[i].role;
            switch (clearence) {
              case 'admin_role':
                clearence = 'Admin'
                break;
              case 'user_role':
                clearence = 'User'
                break;
              case 'campus_role':
                clearence = 'Campus'
                break;
              case 'guest_role':
                clearence = 'Guest'
                break;
              default:
                clearence = 'Guest'
            }
            var person =
            {
              'Username': rows[i].username,
              'Password': rows[i].password,
              'Mail': rows[i].mail,
              'Role': clearence,
              'Campus': rows[i].campus,
              'active': rows[i].active
            }
            personList.push(person);
          }
          res.render('adminpanel', { "personList": personList });
        }
      });
      connection.end();
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