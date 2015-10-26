/**
 * init project as Router
 * @author Lonefy@foxmail.com
 */
'use strict';
var fs = require('fs');
var buffer = require('buffer');
var path = require('path');
var gFile = require('./lib/genfile');

module.exports = function (opt) {

    opt = opt || {}
    var back_base = process.cwd()
       ,routerMap = opt.router; 

    for(var i=0, len=routerMap.length; i<len; i++){
        var r = routerMap[i];

        folderInit({
            basePath: back_base, 
            midPath: "/server_back", 
            folderPath: r[0],
            type: 'html'
        })
        folderInit({
            basePath: back_base, 
            midPath: "/src/js", 
            folderPath: r[1],
            type: 'ctrl'
        })
    }

};
/*
 * basePath@string
 * midPath@string
 * folderPath@Array
 */
function folderInit(opt){
    var p = opt.basePath + opt.midPath, 
        folderPath = opt.folderPath.split('/');

    for(var i=0,l=folderPath.length; i<l; i++){
        
        if(folderPath[i] !== '' && i<l-1){
            p +=  '/' + folderPath[i];
            mkdir(forWinPath(p));
        }
        if(i==l-1){
            mkfile(forWinPath(p), folderPath, opt.type);
        }
    }

}

function forWinPath(p){
    return p.replace(/\\/g, "/");
}

function mkdir(p){
    if (!fs.existsSync(p)) {
        fs.mkdirSync(p, function(err){
            console.log(p + 'has maked');
        });
    }
}

function mkfile(p, name, type){

    if(type == 'html'){
            gFile({
                path: p,
                filePath: p + '/' + name[name.length-1] +'.jade',
                folder: name,
                type: type
            });        
    }
    else{//ctrl, tpl, logic
        var file = [name[name.length-1]+".js", 'tpl.jade', 'logic.js']
          , types = ['ctrl', 'tpl', 'logic'];
        
        for(var i=0, l=types.length, flag=true; flag && i<l; i++){
            flag &= gFile({
                path: p,
                filePath: p + '/' + file[i],
                folder: name, 
                file: file,
                type: types[i]
            });
        }
    }
}
