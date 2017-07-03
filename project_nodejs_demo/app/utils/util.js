var fs = require('fs');
var path = require('path');
var common = {};
//截取url标识，用于判断游戏类型
common.getGameKeyword = function (url) {
    var newUrl = decodeURIComponent(url);//转码
    if (!newUrl) {
        return '';
    }
    var matches = newUrl.match(/games+.*\//);
    if (matches.length > 0) {
        return matches[0].replace('games/', '').replace('/', '');
    } else {
        return '';
    }
};
common.isUrl = function(url){
    if(common.isBlank(url)) return false;
    return /^(http:\/\/)|(https:\/\/)/.test(url);
};

common.isAbsoluteUrl = function(url){
    return '/' === url.charAt(0);
};

common.isEmail = function(email){
    if(common.isBlank(email)) return false;
    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email);
};
common.isPhone = function (phone) {
    var reg = /^1[3,5,8]\d{9}$/;
    if(reg.test(phone))
    {
        return true;//是手机号码
    } else
    {
        return false;//不是手机号码
    }
};
common.inArray = function(value, array){
    if(!value) return false;
    if(array && array.length <= 0) return true;
    for(var p in array){
        if(value == array[p]) return true;
    }
    return false;
};

common.isFunction = function(obj){
    return typeof obj === 'function';
};

common.isNumber = function(obj){
    if(typeof obj == "undefined") return false;
    return /^[0-9]*$/.test(obj);
};

common.type = function (o) {
    var s = Object.prototype.toString.call(o);
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

['Null',
    'Undefined',
    'Object',
    'Array',
    'String',
    'Number',
    'Boolean',
    'Function',
    'RegExp',
    'Element',
    'NaN',
    'Infinite'
].forEach(function (t) {
    common.type['is' + t] = function (o) {
        return common.type(o) === t.toLowerCase();
    };
});

Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

String.prototype.trim = function(){
    if(!this || this == "undefined" || this == null) return this;
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

common.isBlank = function(obj){
    if(obj == null) return true;
    if(obj === 0) return false;
    if(!obj) return true;
    if(typeof obj === "string" && obj.trim().length === 0) return true;
    return false;
};

common.isNotBlank = function(obj){
    return !common.isBlank(obj);
};

//创建多级文件夹
common.mkdirsSync = function(dirPath, mode) {
    //相对路径
    var tempPath = '';
    if(dirPath.charAt(0) === "/"){
        tempPath = '/';
    }
    if(fs.existsSync(dirPath)){
        return;
    }
    var dirs = dirPath.split('/');

    for(var p in dirs){
        if(dirs[p]){
            tempPath += dirs[p] + '/';
            if(!fs.existsSync(tempPath)){
                fs.mkdirSync(tempPath, mode);
            }
        }
    }
};

common.getUploadImg = function(dirPath){
    var date = new Date();
    dirPath += date.getFullYear() + '/';
    dirPath += date.getMonth() + 1 + '/';
    dirPath += date.getDate() + '/';
    common.mkdirsSync(dirPath, 0777);
    return dirPath;
};

common.definedTimeout = function(method, delay, params){
    setTimeout(function(){
        method(params);
    }, delay);
};


common.chatEmail = function(email){
    if(common.isBlank(email)) return email;
    return email.substring(0, email.indexOf('@'));
};

// 返回给定范围内的随机数
common.getRandomArbitrary = function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
};

// 返回给定范围内的随机整数
common.getRandomInt = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


//36进制转10进制
common.get36SystemTo10System = function get36SystemTo10System(number){
    if(number && (/^[A-Za-z0-9]/.test(number))){
        return parseInt(number,36);
    }else{
        return null;
    }
}

//10进制转36进制
common.get10SystemTo36System = function get36SystemTo10System(number){
    if (number && this.isNumber(number)) {
        var tempNumber = new Number(number);
        var tempStr = tempNumber.toString(36);
        if (tempStr.length < 4) {
            tempStr = "0000" + tempStr;
            tempStr = tempStr.substr(tempStr.length - 4);
        }
        return tempStr;
    } else {
        return null;
    }
}

module.exports = common;