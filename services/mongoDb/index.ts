import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';

mongoose.Promise = Promise;
let mongoServer: any;

interface Options extends Record<string, Promise<string> | string>{}

export const getUri = async (): Promise<string> => {
	mongoServer = await MongoMemoryServer.create();
	const options: Options = {
		'test': mongoServer.getUri(),
		'development': process.env.DB_CNN_DEV || '',
		'production': process.env.DB_CNN_PROD || '',
	}
	return (options[process.env.NODE_ENV || 'development'])
}

export const connect = async (uri: Promise<string>) => {
	try {
		mongoose.connect(await uri);
		console.log(`MongoDB sucessfully connected to ${await uri}`)
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
