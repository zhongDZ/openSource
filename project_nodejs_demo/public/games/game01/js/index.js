var addFunc = function(){
    $.ajax({
        type: 'post',
        url: system.addUrl,
        data: JSON.stringify({
           wx_id : 'wx_id',
           nick_name : 'nick_name' 
        }),
        dataType: 'json',
        beforeSend: function () { },
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

var reduceFunc = function(){
    $.ajax({
        type: 'post',
        url: system.reduceUrl,
        data: JSON.stringify({
           wx_id : 'wx_id',
           nick_name : 'nick_name' 
        }),
        dataType: 'json',
        beforeSend: function () { },
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

var checkFunc = function(){
    $.ajax({
        type: 'post',
        url: system.checkUrl,
        data: JSON.stringify({
           wx_id : 'wx_id',
           nick_name : 'nick_name' 
        }),
        dataType: 'json',
        beforeSend: function () { },
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

var updateFunc = function(){
    $.ajax({
        type: 'post',
        url: system.updateUrl,
        data: JSON.stringify({
           wx_id : 'wx_id',
           nick_name : 'nick_name' 
        }),
        dataType: 'json',
        beforeSend: function () { },
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}