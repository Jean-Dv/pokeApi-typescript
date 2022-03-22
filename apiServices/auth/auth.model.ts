import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	userId: String,
	email: String,
	password: String,
})

export const UserModel = model('UserModel', userSchema);
