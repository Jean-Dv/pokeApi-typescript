import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';

mongoose.Promise = Promise;
var mongoServer: any;

export const getUri = (): string => {
	mongoServer = MongoMemoryServer.create();
	if (process.env.NODE_ENV === 'test') {
		return mongoServer.getUri();
	} else if (process.env.NODE_ENV === 'development') {
		return process.env.DB_CNN_DEV || '';
	} else if (process.env.NODE_ENV === 'production') {
		return process.env.DB_CNN_PROD || '';
	}
	return '';
}

export const connect = async (uri: string ) => {
	try {
		await mongoose.connect(uri);
		console.log(`MongoDB sucessfully connected to ${uri}`)
	} catch (err) {
		console.log(err);
		throw new Error('Error initializing database...')
	}
}

export const closeDb = async () => {
	await mongoose.disconnect();
	if (process.env.NODE_ENV === 'test') {
		await mongoServer.stop();
	}
}
