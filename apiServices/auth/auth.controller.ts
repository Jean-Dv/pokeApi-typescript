import { v4 }from 'uuid';

import { comparePassword, hashPasswordSync } from '../../config/hashed';

interface UsersDatabase {
	email: string;
	password: string;
}

export class UserController {
	private usersDatabase: { [key:string]: UsersDatabase };
	private email: string;
	private password: string;
	constructor(reqEmail:string, reqPassword:string) {
		this.usersDatabase = {};
		this.email = reqEmail;
		this.password = reqPassword;
	}

	registerUser(): void {
		let hashedPwd = hashPasswordSync(this.password);
		this.usersDatabase[v4()] = {
			email: this.email,
			password: hashedPwd
		}
	}

	getUserIdFromEmail(): object {
		for(let user in userDatabase) {
			if(userDatabase[user].email === this.email) {
				return userDatabase[user];
			}
		}
		return {};
	}

	getUserId():string {
		for(let user in userDatabase) {
			if(userDatabase[user].email === this.email) {
				return user
			}
		}
		return '';
	}

	checkUserCredentials():boolean {
		let user = getUserIdFromEmail(this.email);
		if(user) {
			return comparePassword(this.password, user.password);
		}
		return false;
	}
}

const userDatabase: { [key: string]: UsersDatabase } = {};

export const registerUser = (email: string, password: string) => {
	let hashedPwd = hashPasswordSync(password);
	userDatabase[v4()] = {
		email: email,
		password: hashedPwd
	}
	console.log(userDatabase)
}

const getUserIdFromEmail = (email:string)=> {
	for (let user in userDatabase) {
		if ( userDatabase[user].email === email ) {
			return userDatabase[user];
		}
	}
}

export const getUserId = (email:string) => {
	for (let user in userDatabase) {
		if (userDatabase[user].email === email) {
			return user
		}
	}
}

export const checkUserCredentials = (email:string, password: string):boolean => {
	let user = getUserIdFromEmail(email);
	if (user) {
		return comparePassword(password, user.password);
	}
	return false;
}
