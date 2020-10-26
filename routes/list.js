var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const role_is = require('../public/javascripts/role_que.js');
const cookie_monster = require('../public/javascripts/cookie_monster.js');
const refresher = require('../public/javascripts/refresher');
const campusfind = require('../public/javascripts/campusfind.js');

/* GET to list page. */
router.get('/', function (req, res, next) {
  cookie_monster(req, res, next);

  if (req.session.mysession) {

    if (req.cookies._krol == role_is('campus_role')) {

      var kcampus = campusfind(req.cookies._kcam);

      refresher(req, res, next);

      var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'ITman',
        password: 'Kernel1070',
        dateStrings: true,
        database: 'inventory'
      });
      var entityList = [];
      var auth = 'SELECT * FROM list WHERE Campus = ? AND active = "1"';
      connection.connect();
      connection.query(auth, kcampus, function (err, rows, fields) {
        if (err) {
          res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
        }
        else {
          for (var i = 0; i < rows.length; i++) {
            var entity =
            {
              'ID': rows[i].ID,
              'pType': rows[i].pType,
              'pName': rows[i].pName,
              'pBrand': rows[i].pBrand,
              'Date': rows[i].Date,
              'responsible': rows[i].responsible,
              'Detail': rows[i].Detail,
              'garanti_start': rows[i].garanti_start,
              'garanti_end': rows[i].garanti_end,
              'Unit': rows[i].Unit,
              'Campus': rows[i].Campus,
              'active': rows[i].active
            }
            entityList.push(entity);
          }
          res.render('list', { "entityList": entityList });
        }
      });
      connection.end();
    }

    else if (req.cookies._krol == role_is('user_role')) {
      refresher(req, res, next);

      var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'ITman',
        password: 'Kernel1070',
        dateStrings: true,
        database: 'inventory'
      });
      var entityList = [];
      connection.connect();
      connection.query('SELECT * FROM inventory.list WHERE active = "1"', function (err, rows, fields) {
        if (err) {
          res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
        }
        else {
          for (var i = 0; i < rows.length; i++) {
            var entity =
            {
              'ID': rows[i].ID,
              'pType': rows[i].pType,
              'pName': rows[i].pName,
              'pBrand': rows[i].pBrand,
              'Date': rows[i].Date,
              'responsible': rows[i].responsible,
              'Detail': rows[i].Detail,
              'garanti_start': rows[i].garanti_start,
              'garanti_end': rows[i].garanti_end,
              'Unit': rows[i].Unit,
              'Campus': rows[i].Campus,
              'active': rows[i].active
            }
            entityList.push(entity);
          }
          res.render('list', { "entityList": entityList });
        }
      });
      connection.end();
    }

    else if (req.cookies._krol == role_is('admin_role')) {
      refresher(req, res, next);



      var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'ITman',
        password: 'Kernel1070',
        dateStrings: true,
        database: 'inventory'
      });
      var entityList = [];
      connection.connect();
      connection.query('SELECT * FROM inventory.list', function (err, rows, fields) {
        if (err) {
          res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
        }
        else {
          for (var i = 0; i < rows.length; i++) {
            var entity =
            {
              'ID': rows[i].ID,
              'pType': rows[i].pType,
              'pName': rows[i].pName,
              'pBrand': rows[i].pBrand,
              'Date': rows[i].Date,
              'responsible': rows[i].responsible,
              'Detail': rows[i].Detail,
              'garanti_start': rows[i].garanti_start,
              'garanti_end': rows[i].garanti_end,
              'Unit': rows[i].Unit,
              'Campus': rows[i].Campus,
              'active': rows[i].active
            }
            entityList.push(entity);
          }
          res.render('list', { "entityList": entityList });
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