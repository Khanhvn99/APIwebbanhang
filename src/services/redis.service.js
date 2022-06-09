const Redis = require('ioredis');

class RedisService {
  constructor() {
    this.redis = new Redis({
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      db: 0,
    });
  }
  /**
   *
   * @param {String} key
   * @param {any} value
   * @param {int} timeout second (EX: second, PX milliseconds )
   */
  set(key, value, timeout) {
    let result = null;
    if (!timeout) {
      result = this.redis.set(key, value); // unlimit
    } else result = this.redis.set(key, value, 'EX', timeout); // expiresIn timeout(s)
    return result;
  }
  get(key) {
    const result = this.redis.get(key);
    return result;
  }
  del(key) {
    const result = this.redis.del(key);
    return result;
  }
  getTTL(key) {
    const result = this.redis.ttl(key);
    return result;
  }
}
module.exports = RedisService;
