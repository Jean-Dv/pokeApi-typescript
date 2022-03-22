import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';

mongoose.Promise = Promise;
var mongoServer: any;

export const getUri = async () => {
	mongoServer = await MongoMemoryServer.create();
	if (process.env.NODE_ENV === 'test') {
		return await mongoServer.getUri();
	} else if (process.env.NODE_ENV === 'development') {
		return process.env.DB_CNN_DEV;
	}
	return process.env.DB_CNN_PROD;
}

export const connect = async (uri: string) => {
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
