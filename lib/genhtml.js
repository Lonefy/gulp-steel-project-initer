/**
 * init project 
 * generate server_back HTML 
 * @author Lonefy@foxmail.com
 */
'use strict';

var path = require('path');

module.exports = function (opt) {

    var base = process.cwd() + '/server_back/base';

    return "include " + path.relative(opt.path, base).replace(/\\/g, "/");
};

function checkBase(base){
    if(fs.existsSync(base)) return true;
}


