var addFunc = function(){
    $.ajax({
        type: 'post',
        url: '/birds/addUrl',
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
        url: '/birds/reduceUrl',
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
        url: '/birds/checkUrl',
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
        url: '/birds/updateUrl',
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