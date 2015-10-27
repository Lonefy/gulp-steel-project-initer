/**
 * init project 
 * generate javascript 
 * @author Lonefy@foxmail.com
 */
'use strict';

module.exports = function (opt) {

    var folder = opt.folder, 
        file = opt.file, 
        type = opt.type;

    var components = {
        ctrl: "control",
        logic: "node, data"
    }

    function moduleOuter(param){
        return  "module.exports = function("+ param +") {" + moduleBody()  +"\n};"         
    }

    function moduleBody(){
      if(type=='logic') return "";
        folder.pop();
        folder = folder.join('/');
        
        return    ["",
                  ,"control.set({"
                  ,"    data: null,"
                  ,"    tpl: '"+ folder +"/"+ removePost(file[1]) +"',"
                  ,"    logic: '"+ folder +"/" + removePost(file[2]) +"',"
                  ,"    css: ''"
                  ,"});"].join('\n\t');
    }
    return (type=='tpl')? "":moduleOuter(components[type]);
};

function removePost(p){
    return p.replace(/\.\w+$/g, "");
}



