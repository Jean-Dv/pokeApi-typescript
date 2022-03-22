import { v4 } from 'uuid';

import { comparePassword, hashPasswordSync } from '../../config/hashed';
import { TeamsController } from '../teams/teams.controller';
import { UserModel } from './auth.model';
import { to } from '../../config/tools/to';

interface UsersDatabase {
	email: string;
	password: string;
}

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
			let newUser = new UserModel({
				userId: userId,
				email: email,
				password: hashedPwd
			})
			await newUser.save();
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
			let [err, result] = await to(UserModel.findOne({email: email}).exec());
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		})
	}
	
	/**
	 * @param {string} email -> Email coming from request
	 * @return {string} userId -> id create uuid.v4()
	 */
	getUserId(email: string):Promise<string> {
		return new Promise(async (resolve, reject) => {
			let [err, result] = await to(UserModel.findOne({email: email}).exec());
			if (err) {
				reject(err);
			}
			resolve(result.userId)
		})
	}
	
	/**
	 * @param {string} userId -> userId uuid.v4()
	 * @return { UsersDatabase } -> Interface UsersDatabase
	 */
	getUser(userId: string): Promise<UsersDatabase> {
		return new Promise(async (resolve, reject) => {
			let [err, result] = await to(UserModel.findOne({userId: userId}).exec());
			if (err) {
				reject(err);
			}
			resolve(result)
		})
	}

	/**
	 * @param {string} email -> Email coming from request
	 * @param {string} password -> Password coming from request
	 * @return {boolean} comparePassword -> compare plain password with hashed in database
	 */
	checkUserCredentials(email: string, password: string): Promise<any> {
		return new Promise(async (resolve, reject) => {
			let [err, user] = await to(this.getUserIdFromEmail(email));
			if (user || err != null) {
				comparePassword(password, user.password, (err: any, result:any) => {
					if (err) {
						reject(err);
					} else {
						resolve(result)
					}
				});
			} else {
				reject(err);
			}
		})
	}

	/**
	 * @return {void} clear Database
	 */
	cleanUpUsers(): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await UserModel.deleteMany({}).exec();
			resolve();
		})
	}
}
