import { v4 } from 'uuid';

import { comparePassword, hashPasswordSync } from '../../config/hashed';
import { bootstrapTeam } from '../teams/teams.controller';

interface UsersDatabase {
	email: string;
	password: string;
}

const usersDatabase: { [key:string]: UsersDatabase } = {};

export class UserController {
	registerUser(email: string, password: string): void {
		let hashedPwd = hashPasswordSync(password);
		let userId = v4();
		usersDatabase[userId] = {
			email: email,
			password: hashedPwd
		}
		bootstrapTeam(userId);
	}

	getUserIdFromEmail(email: string): UsersDatabase {
		for(let user in usersDatabase) {
			if(usersDatabase[user].email === email) {
				return usersDatabase[user];
			}
		}
		return { email: '', password: '' }
	}

	getUserId(email: string):string {
		for(let user in usersDatabase) {
			if(usersDatabase[user].email === email) {
				return user
			}
		}
		return '';
	}

	getUser(userId: string):any{
		return usersDatabase[userId];
	}

	checkUserCredentials(email: string, password: string):boolean {
		let user = this.getUserIdFromEmail(email);
		if(user) {
			return comparePassword(password, user.password);
		}
		return false;
	}
}
