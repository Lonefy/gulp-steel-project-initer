/**
 * init project 
 * generate Files
 * @author Lonefy@foxmail.com
 */
'use strict';
var fs = require('fs');
var gj = require('./genjs');
var gh = require('./genhtml');

module.exports = function (opt) {

    if (fs.existsSync(opt.filePath)) return false;

    fs.writeFile(opt.filePath, (opt.type == 'html')? gh(opt): gj(opt) , {encoding: 'utf8'}, function(e){
        if(e){
            console.log(e);
        }else{
            console.log("GEN:  " + opt.filePath);
        }
    })
    return true;
};
