// connecting to Mongo Database
import { MongoClient } from 'mongodb';

class DBClient {
    constructor() {
	const host = process.env.DB_HOST || 'localhost';
	const port = process.env.DB_PORT || 27017;
	const database = process.env.DB_DATABASE || 'files_manager';

	this.url = `mongodb://${host}:${port}`;
	
	this.client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true});

	this.client.connect()
	    .then(() => {
		this.dbName = this.client.dbName
	    })
	    .catch ((err) => {
		console.error('MongoDB connection error: ${err}')
	    });
    }

    //connect to MONGODB and check if connection is alive
    isAlive() {
	return this.client && this.client.isConnected();
    }

    //get number of documents in 'users'
    async nbUsers() {
	try {
	    const usersCollection = this.db.collection('users');
	    return await usersCollection.countDocuments();
	} catch (err) {
	    console.error(`Error counting users: ${err}`);
	    return 0;
	}
    }

    // get number of documents in files collection
    async nbFiles() {
	try {
	    const filesCollection = this.db.collection('files');
	    return await filesCollection.countDocuments();
	} catch (err) {
	    console.error(`Error counting files: ${err}`);
	    return 0;
	}
    }
}

// Export an instance of DBClient
const dbClient = new DBClient();
export default dbClient;
