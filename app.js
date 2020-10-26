var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var fs = require('fs');

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var mainRouter = require('./routes/main');
var logoutRouter = require('./routes/logout');
var listorderRouter = require('./routes/listorder');
var listRouter = require('./routes/list');
var listaddRouter = require('./routes/listadd');
var listaddpostRouter = require('./routes/listaddpost');
var listaddrRouter = require('./routes/listaddr');
var listupdateRouter = require('./routes/listupdate');
var listupdaterRouter = require('./routes/listupdater');
var userorderRouter = require('./routes/userorder');
var adminpanelRouter = require('./routes/adminpanel');
var useraddRouter = require('./routes/useradd');
var useraddrRouter = require('./routes/useraddr');
var userupdateRouter = require('./routes/userupdate');
var userupdaterRouter = require('./routes/userupdater');
var depotorderRouter = require('./routes/depotorder');
var depotRouter = require('./routes/depot');
var depotgiveRouter = require('./routes/depotgive');
var depotgiverRouter = require('./routes/depotgiver');
var depotaddRouter = require('./routes/depotadd');
var depotaddpostRouter = require('./routes/depotaddpost');
var depotaddrRouter = require('./routes/depotaddr');
var depotupdateRouter = require('./routes/depotupdate');
var depotupdaterRouter = require('./routes/depotupdater');


var app = express();

app.use(express.static(path.join(__dirname, './public')));
app.use(cookieParser('Kernel1070'))
app.use(session({ resave: true, saveUninitialized: false, secret: 'Kernel1070', cookie: { maxAge: 60 * 60 * 1000 } })); //maxAge=Timeout süresi
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './express')));			///

// view engine setup
app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('common', {
  stream: fs.createWriteStream('./z-log.log', { flags: 'a' })
}));
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/main', mainRouter);
app.use('/logout', logoutRouter);
app.use('/listorder', listorderRouter);
app.use('/list', listRouter);
app.use('/listadd', listaddRouter);
app.use('/listaddpost', listaddpostRouter);
app.use('/listaddr', listaddrRouter);
app.use('/listupdate', listupdateRouter);
app.use('/listupdater', listupdaterRouter);
app.use('/userorder', userorderRouter);
app.use('/adminpanel', adminpanelRouter);
app.use('/useradd', useraddRouter);
app.use('/useraddr', useraddrRouter);
app.use('/userupdate', userupdateRouter);
app.use('/userupdater', userupdaterRouter);
app.use('/depotorder', depotorderRouter);
app.use('/depot', depotRouter);
app.use('/depotgive', depotgiveRouter);
app.use('/depotgiver', depotgiverRouter);
app.use('/depotadd', depotaddRouter);
app.use('/depotaddpost', depotaddpostRouter);
app.use('/depotaddr', depotaddrRouter);
app.use('/depotupdate', depotupdateRouter);
app.use('/depotupdater', depotupdaterRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.listen(1453, '0.0.0.0', function () {
  console.log(' ');
  console.log('Server Started');
  console.log('You can reach it on this adresses');
  console.log(' ');
  console.log('localhost:1453');
  console.log('127.0.0.1:1453');
  console.log(' ');
  console.log('Default user for web application is');
  console.log('Username: admin ');
  console.log('Password: taek');
  console.log(' ');
});