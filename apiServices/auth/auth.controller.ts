import { v4 } from 'uuid';

import { comparePassword, hashPasswordSync } from '../../config/hashed';
import { TeamsController } from '../teams/teams.controller';

interface UsersDatabase {
	email: string;
	password: string;
}

let usersDatabase: { [key:string]: UsersDatabase } = {};
const teamsController = new TeamsController();

export class UserController {
	/**
	 * @param {string} email -> Email coming from request
	 * @param {string} password -> Password coming from request
	 * @return {void} Create User and Asociate teamsPokemon
	 */
	registerUser(email: string, password: string): void {
		let hashedPwd = hashPasswordSync(password);
		let userId = v4();
		usersDatabase[userId] = {
			email: email,
			password: hashedPwd
		}
		teamsController.bootstrapTeam(userId);
	}
	
	/**
	 * @param {string} email -> Email coming from request
	 * @return {UsersDatabase} -> Interface UsersDatabase
	 */
	getUserIdFromEmail(email: string): UsersDatabase {
		for(let user in usersDatabase) {
			if(usersDatabase[user].email === email) {
				return usersDatabase[user];
			}
		}
		return { email: '', password: '' }
	}
	
	/**
	 * @param {string} email -> Email coming from request
	 * @return {string} userId -> id create uuid.v4()
	 */
	getUserId(email: string):string {
		for(let user in usersDatabase) {
			if(usersDatabase[user].email === email) {
				return user
			}
		}
		return '';
	}
	
	/**
	 * @param {string} userId -> userId uuid.v4()
	 * @return { UsersDatabase } -> Interface UsersDatabase
	 */
	getUser(userId: string): UsersDatabase{
		return usersDatabase[userId];
	}

	/**
	 * @param {string} email -> Email coming from request
	 * @param {string} password -> Password coming from request
	 * @return {boolean} comparePassword -> compare plain password with hashed in database
	 */
	checkUserCredentials(email: string, password: string):boolean {
		let user = this.getUserIdFromEmail(email);
		if(user) {
			return comparePassword(password, user.password);
		}
		return false;
	}

	/**
	 * @return {void} clear Database
	 */
	cleanUpUsers(): void {
		usersDatabase = {};
	}
}
