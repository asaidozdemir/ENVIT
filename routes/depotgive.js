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

      var itemid = req.body.givenitem;

      var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'ITman',
        password: 'Kernel1070',
        database: 'inventory'
      });

      connection.connect();
      var auth = 'SELECT * FROM depot WHERE ID = ?';
      connection.query(auth, itemid, function (err, rows, fields) {
        if (err) {
          res.status(500).json({ "status_code": 500, "status_message": "internal server error" });
        }
        else {
          var entity =
          {
            'ID': rows[0].ID,
            'pType': rows[0].pType,
            'pName': rows[0].pName,
            'pBrand': rows[0].pBrand,
            'pCount': rows[0].pCount,
            'Date': rows[0].Date,
            'Detail': rows[0].Detail,
            'garanti_start': rows[0].garanti_start,
            'garanti_end': rows[0].garanti_end,
            'Dest': rows[0].Dest,
            'active': rows[0].active
          }
          if(entity.pCount>0)
          {
            var testObj = '{"pType":"' + entity.pType + '", "pName":"' + entity.pName + '", "pBrand":"' + entity.pBrand + '", "pCount":"' + entity.pCount + '", "Date":"' + entity.Date + '", "Detail":"' + entity.Detail + '", "garanti_start":"' + entity.garanti_start + '", "garanti_end":"' + entity.garanti_end + '", "Dest":"' + entity.Dest + '", "active":"' + entity.active + '"}';
            var ms = 60 * 60 * 1000;
            res.cookie('CGID', entity.ID, { expires: new Date(Date.now() + ms) });
            res.cookie('CCID', entity.pCount, { expires: new Date(Date.now() + ms) });
            res.render('depotgive', { "testObj": testObj });
          }
          else{
            refresher(req, res, next);
            res.render('main', { hata: "Yeterli Malzeme Yok" });}
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