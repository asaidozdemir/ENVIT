var crypto = require('crypto');
const campuslist = require('./campuslist');

function campusfind(txt) {

  for (var campid = 0; campid < campuslist.length; campid++) {
    var ttt = campuslist[campid] + "_campus";
    var hash = crypto.createHash('sha256').update(ttt).digest('hex');
    //console.log("1-txt  =" + txt);
    //console.log("2-ttt  =" + ttt);
    //console.log("3-hash =" + hash);
    //console.log("4-" + campuslist[campid]);
    if (txt === hash) { return campuslist[campid]; }
  }
  return -1;
}
module.exports = campusfind;