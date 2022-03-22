import { TeamModel } from "./teams.model";
import { to } from '../../config/tools/to';

interface NamePokemon {
	[name: string]: any;
}

export class TeamsController {
	constructor() {}
	
	/**
	 * @param {string} userId - Param userId 
	 * @returns {Promise<void>} This update team with user
	*/
	bootstrapTeam(userId: string):Promise<void> {
		return new Promise(async (resolve, reject) => {
			let newTeam = new TeamModel({userId: userId, team:[]})
			await newTeam.save();
			resolve();
		})
	}
	
	/**
	 * @param {string} userId
	 * @returns {Promise<NamePokemon>} - Structure of interface
	*/
	getTeamOfUser(userId: string): Promise<NamePokemon> {
		return new Promise(async (resolve, reject) => {
			let [err, dbTeam] = await to(TeamModel.findOne({userId: userId}).exec())
			if (err) {
				reject(err);
			}
			resolve(dbTeam.team);
		})
	}
	
	/**
	 * @param {string} userId
	 * @param {string} pokemon
	 * @returns {Promise<void>} add data to teamsDatabase
	*/
	addPokemon(userId:string, pokemon: object): Promise<void> {
		return new Promise(async (resolve, reject) => {
			let [err, dbTeam] = await to(TeamModel.findOne({userId: userId}).exec());
			if (err) {
				reject(err);
			}
			if (dbTeam.team.length == 6) {
				reject('Already have 6 pokemon');
			} else {
				dbTeam.team.push(pokemon);
				await dbTeam.save();
				resolve();
			}
		})
	}

	/**
	 * @param {string} userId
	 * @param {string} pokemonIndex
	 * @returns {Promise<void>} delete pokemon in the database
	 */
	deletePokemonAt(userId:string, pokemonIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			let [err, dbTeam] = await to(TeamModel.findOne({userId: userId}).exec());
			if (err || !dbTeam) {
				reject(err)
			}
			if (dbTeam.team[pokemonIndex]) {
				dbTeam.team.splice(pokemonIndex, 1);
			}
			await dbTeam.save();
			resolve();
		})
	}

	/**
	 * @param {string} userId
	 * @param {object} team
	 * @returns {Promise<void>} update all teamsDatabase
	*/
	setTeam(userId:string, team: object): Promise<void> {
		return new Promise(async (resolve, reject) => {
			let [err, dbTeam] = await to(TeamModel.updateOne(
				{userId: userId},
				{$set: {team: team}},
				{upsert: true}).exec());
			if (err || !dbTeam) {
				return reject(err);
			}
			resolve();
		})
	}

	/**
	 * @returns {Promise<void>} clear database
	 */
	cleanUpTeam():Promise<void> {
		return new Promise(async (resolve, reject) => {
			await TeamModel.deleteMany({}).exec();
			resolve();
		})
	}
}
