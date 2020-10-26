var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const role_is = require('../public/javascripts/role_que.js');
const passhash = require('../public/javascripts/passhash.js');
const cookie_monster = require('../public/javascripts/cookie_monster.js');

/* POST to wait page. */
router.post('/', function (req, res, next) {
  cookie_monster(req, res, next);

  var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'ITman',
    password: 'Kernel1070',
    database: 'inventory'
  });

  connection.connect(function (err) {
    var auth = "SELECT username, password, Role, Campus FROM usertab WHERE username = ? ";
    if (err) console.log(err);
    else {
      connection.query(auth, [req.body.userid], function (error, results, fields) {
        if (err) console.log(err);
        else {
          if (!results.length) {
            console.log('User not found');
            res.render('index', { hata: 'Kullanıcı Adı veya Şifre Hatalı' });
          }
          else if (results[0].username === req.body.userid && results[0].password === passhash(req.body.pswrd)) {
            req.session.mysession = "xsession";
            console.log("Session Start:  " + req.session.id);

            switch (results[0].Role) {
              case 'admin_role':
                var hash = role_is("admin_role")
                console.log("_krol = admin_role : " + hash);
                var ms = 60 * 60 * 1000;
                res.cookie('_krol', hash, { expires: new Date(Date.now() + ms) });
                break;
              case 'user_role':
                var hash = role_is("user_role")
                console.log("_krol = user_role : " + hash);
                var ms = 60 * 60 * 1000;
                res.cookie('_krol', hash, { expires: new Date(Date.now() + ms) });
                break;
              case 'campus_role':
                var hash = role_is("campus_role")
                console.log("_krol = campus_role : " + hash);
                var ms = 60 * 60 * 1000;
                res.cookie('_krol', hash, { expires: new Date(Date.now() + ms) });
                var cmp = results[0].Campus + "_campus";
                var hash = role_is(cmp)
                console.log("_kcam = campus : " + hash);
                res.cookie('_kcam', hash, { expires: new Date(Date.now() + ms) });
                break;
              case 'guest_role':
                var hash = role_is("guest_role")
                console.log("_krol = guest_role : " + hash);
                var ms = 60 * 60 * 1000;
                res.cookie('_krol', hash, { expires: new Date(Date.now() + ms) });
                break;
              default:
                var hash = role_is("guest_role")
                console.log("_krol = guest_role : " + hash);
                var ms = 60 * 60 * 1000;
                res.cookie('_krol', hash, { expires: new Date(Date.now() + ms) });
            }
            res.render('main');
          }
          else {
            console.log('Password incorrect');
            res.render('index', { hata: 'Kullanıcı Adı veya Şifre Hatalı' });
          }
        }
      });
      connection.end(function (err) {
        if (err) console.log(err);
      });
    }
  });
});

module.exports = router;