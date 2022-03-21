import { v4 } from 'uuid';

import { comparePassword, hashPasswordSync } from '../../config/hashed';
import { TeamsController } from '../teams/teams.controller';

interface UsersDatabase {
	email: string;
	password: string;
}

let usersDatabase: { [userId:string]: UsersDatabase } = {};
const teamsController = new TeamsController();

export class UserController {
	/**
	 * @param {string} email -> Email coming from request
	 * @param {string} password -> Password coming from request
	 * @return {void} Create User and Asociate teamsPokemon
	 */
	registerUser(email: string, password: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			let hashedPwd = hashPasswordSync(password);
			let userId = v4();
			usersDatabase[userId] = {
				email: email,
				password: hashedPwd
			}
			await teamsController.bootstrapTeam(userId);
			resolve();
		})
	}
	
	/**
	 * @param {string} email -> Email coming from request
	 * @return {UsersDatabase} -> Interface UsersDatabase
	 */
	getUserIdFromEmail(email: string): Promise<UsersDatabase> {
		return new Promise(async (resolve, reject) => {
			for(let user in usersDatabase) {
				if(usersDatabase[user].email === email) {
					resolve(usersDatabase[user]);
				}
			}
		})
	}
	
	/**
	 * @param {string} email -> Email coming from request
	 * @return {string} userId -> id create uuid.v4()
	 */
	getUserId(email: string):Promise<string> {
		return new Promise(async (resolve, reject) => {
			for(let user in usersDatabase) {
				if(usersDatabase[user].email === email) {
					resolve(user);
				}
			}
			reject('No user found');
		})
	}
	
	/**
	 * @param {string} userId -> userId uuid.v4()
	 * @return { UsersDatabase } -> Interface UsersDatabase
	 */
	getUser(userId: string): Promise<UsersDatabase> {
		return new Promise(async (resolve, reject) => {
			resolve(usersDatabase[userId]);
		})
	}

	/**
	 * @param {string} email -> Email coming from request
	 * @param {string} password -> Password coming from request
	 * @return {boolean} comparePassword -> compare plain password with hashed in database
	 */
	checkUserCredentials(email: string, password: string): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			let user = await (this.getUserIdFromEmail(email));
			if(user) {
				resolve(comparePassword(password, user.password));
			}
			reject(false);
		})
	}

	/**
	 * @return {void} clear Database
	 */
	cleanUpUsers(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			usersDatabase = {};
			resolve();
		})
	}
}
