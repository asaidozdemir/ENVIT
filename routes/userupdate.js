var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const role_is = require('../public/javascripts/role_que.js');
const passhash = require('../public/javascripts/passhash.js');
const cookie_monster = require('../public/javascripts/cookie_monster.js');
const refresher = require('../public/javascripts/refresher');

/* POST to userupdate page. */
router.post('/', function (req, res, next) {
  cookie_monster(req, res, next);

  if (req.session.mysession) {
    if (req.cookies._krol == role_is('admin_role')) {
      refresher(req, res, next);

      var updateid = req.body.identify;
      updateid = updateid.slice(0, 64);

      var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'ITman',
        password: 'Kernel1070',
        dateStrings: true,
        database: 'inventory'
      });
      connection.connect();

      var auth = 'SELECT * FROM inventory.usertab WHERE username = ?';

      connection.query(auth, updateid, function (err, rows, fields) {
        if (err) {
          res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
        }
        else {
          var clearence = rows[0].role;
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

          var entity =
          {
            'username': rows[0].username,
            'password': rows[0].password,   //rows[0].password
            'email': rows[0].mail,
            'role': clearence,
            'campus': rows[0].campus,
            'active': rows[0].active
          }
          var testObj = '{"username":"' + entity.username + '", "password":"' + entity.password + '", "email":"' + entity.email + '", "role":"' + entity.role + '", "campus":"' + entity.campus + '", "active":"' + entity.active + '"}';

          var ms = 60 * 60 * 1000;
          res.cookie('CUID', entity.username, { expires: new Date(Date.now() + ms) });

          res.render('userupdate', { "testObj": testObj });
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