var server = {
    init: function() {
        if (!localStorage.ServerEmulatorIsSet) {
            localStorage.ServerEmulatorIsSet = true;
            localStorage.Players = JSON.stringify([]);
            localStorage.Updatable = "^(?:sound_enabled|music_enabled|last_rows_value|last_columns_value|last_mines_value)$";
            localStorage.CanBeIncreasedOnly = "^(?:games|wins|mines_defused|total_time_played)$";
        }
    },

    _createNewPlayer: function(aLogin, aPassword) {
        var player = {
            login: aLogin,
            password: aPassword,
            games: 0,
            wins: 0,
            mines_defused: 0,
            total_time_played: 0,
            sound_enabled: true,
            music_enabled: true,
            last_rows_value: 16,
            last_columns_value: 16,
            last_mines_value: 40
        };
        var Players = JSON.parse(localStorage.Players);
        Players.push(player);
        localStorage.Players = JSON.stringify(Players);
        return server._returnOK({player:player});
    },

    _returnError: function(aText) {
        return JSON.stringify({status:'error',error:aText});
    },

    _returnOK: function(aObj) {
        aObj.status = 'OK';
        return JSON.stringify(aObj);
    },

    processAction: function(aParams) {
        if (!aParams || !aParams.action || !aParams.login || !aParams.password) {
            return server._returnError('信息有误！');
        }

        var i, players;

        if (aParams.action === 'login') {
            players = JSON.parse(localStorage.Players);
            for (i = 0; i < players.length; i++) {
                if (players[i].login === aParams.login) {
                    if (players[i].password === aParams.password) {
                        return server._returnOK({player:players[i]});
                    } else {
                        return server._returnError('不正确的密码');
                    }
                }
            }
            return server._createNewPlayer(aParams.login, aParams.password);
        }else{
            //TODO
            //注册、修改等等
        }

        return server._returnError('：无动作');
    }
};

// helper.AddTryCatchersToAllMethodsOf(server);

server.init();
