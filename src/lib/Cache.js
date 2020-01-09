import Redis from 'ioredis';

const keyPrefix = 'cache:';

class Cache {
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      keyPrefix,
    });
  }

  set(key, value) {
    return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24);
  }

  async get(key) {
    const cached = await this.redis.get(key);

    return cached ? JSON.parse(cached) : null;
  }

  invalidate(key) {
    return this.redis.del(key);
  }

  async invalidatePrefix(prefix) {
    const keys = await this.redis.keys(`${keyPrefix}${prefix}:*`);

    const keysWithoutPrefix = keys.map(key => key.replace(keyPrefix, ''));

    return this.redis.del(keysWithoutPrefix);
  }
}

export default new Cache();
