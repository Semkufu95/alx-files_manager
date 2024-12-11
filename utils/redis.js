// A redis class module

class RedisClient {
    constructor(client) {
	this.client = redis.createClient();

	this.client.on('error', (err) => {
	    console.error('Redis client error', err)
	});
    }
    
    isAlive() {
	return this.client.connected;
    }

    async get(key) {
	return new Promise((resolve, reject) => {
	    this.client.get(key, (err, value) => {
		if (err) {
		    reject(err);
		} else {
		    resolve(value);
		}
	    });
	});
    }

    async set(key, value, duration) {
	return new Promise((resolve, reject) => {
	    this.client.set(key, value, duration, (err) => {
		if (err) {
		    reject(err);
		} else {
		    resolve();
		}
	    });
	});
    }

    async del(key) {
	return new Promise((resolve, reject) => {
	    this.client.del(key, (err) => {
		if (err) {
		    reject(err)
		} else {
		    resolve()
		}
	    });
	});
    }
}

const redisClient = new RedisClient();
export default redisClient;
