import { Schema, model } from 'mongoose';

const teamSchema = new Schema({
	userId: String,
	team: []
})

export const TeamModel = model('TeamsModel', teamSchema);
