/**
 *
 */
var redis = require('redis');
var config = require('../config/exportConfig');
var Promise = require('promise');
var logger = require("log4js").getLogger(__filename);
var redisDb = {},
    client;

(function(host, port, options) {
    client = redis.createClient(
        port ? port : config.redis.port,
        host ? host : config.redis.host,
        options ? options : {
            auth_pass: config.redis.password,
            db: config.redis.database
        }
    );
    if (typeof config.redis.database === 'number') {
        client.select(config.redis.database);
    }
})();

var quit = function() {
    client.quit((err, res) => {
        logger.debug('redis command quit, res:' + res);
    });
};


client.on('error', (error) => {
    //client.emit('disconnect');
    logger.error('redis error : ' + error);
});

redisDb.client = client;

redisDb.EXPIRES_DAY = 86400;

redisDb.get = function(key) {
    return new Promise((resolve, reject) => {
        client.get(key, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    });
};

redisDb.setex = function(key, value, expires) {
    client.setex(key, expires, value, redis.print);
};

redisDb.set = function(key, value) {
    client.set(key, value, redis.print);
};

/**
 * 删除列表
 * @param key     eg: key    eg:[key1,key2,key3]
 * @returns {boolean}
 */
redisDb.del = function(key) {
   return client.del(key, redis.print);
};


/**
 * 获取列表长度
 * @param  {string} key 列表名
 * @return {number} 列表长度
 */
redisDb.llen = function(key) {
    return new Promise((resolve, reject) => {
        client.llen(key, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    });
};
/**
 * 移除并获取列表最后一个元素
 * @param  {string} key 列表名
 * @return {string}     返回移除的一行数据
 */
redisDb.rpop = function(key) {
    return new Promise((resolve, reject) => {
        client.rpop(key, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    });
};

/**
 * 将一个值插入到列表头部。 如果 key 不存在，一个空列表会被创建并执行 LPUSH 操作。 当 key 存在但不是列表类型时，返回一个错误。
 * @param  {string} key   
 * @param  {string} value 插入值
 * @return {number} 返回列表长度
 */
redisDb.lpush = function(key, value) {
    //client.lpush(key, value, redis.print);
    return new Promise((resolve, reject) => {
        client.lpush(key, value, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    });
};

/**
 * 检查列表是否存在
 * @param  {string} key 列表名
 * @return {boolean}    若 key 存在返回 1 ，否则返回 0 
 */
redisDb.exists = function(key) {
    return new Promise((resolve, reject) => {
        client.exists(key, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    });
};

/*-----------------------redis锁------------------*/
function getLockExpire(timeout) {
    if (timeout) {
        return new Date().getMilliseconds() + timeout;
    } else {
        //默认5分钟过期
        return new Date().getMilliseconds() + 300000;
    }

}
redisDb.getset = function(key) {
    return new Promise((resolve, reject) => {
        client.getset(key, (err, reply) => {
            if (err) {
                reject(err);
            } else {
                resolve(reply);
            }
        });
    });
};


redisDb.isLock = function(key, timeout) {
    return new Promise((resolve, reject) => {
        client.setnx(key, getLockExpire(timeout), (err, reply) => {
            if (reply == 1) {
                resolve(false);
                return;
            } else {
                var oldExpire;
                redisDb.get(key).then((time1) => {
                    if (time1 && time1 < new Date().getMilliseconds()) {
                        oldExpire = time1;
                        return redisDb.getset(key, getLockExpire(timeout));
                    } else {
                        return Promise.resolve(null);
                    }
                }).done((time2) => {
                    if (time2 && time2 == oldExpire) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                }, (err) => {
                    reject(err);
                });
            }
        })
    });

};


module.exports = redisDb;
