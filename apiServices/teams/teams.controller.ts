interface NamePokemon {
	[name: string]: any;
}
const teamsDatabase: { [key: string]: NamePokemon } = {};

export class TeamsController {
	constructor() {}
	
	/**
	 * @param {string} userId - Param userId 
	 * @returns {void} This update team with user
	*/
	bootstrapTeam(userId: string):void {
		teamsDatabase[userId] = [];
	}
	
	/**
	 * @param {string} userId
	 * @returns {NamePokemon} - Structure of interface
	*/
	getTeamOfUser(userId: string): NamePokemon {
		return teamsDatabase[userId];
	}
	
	/**
	 * @param {string} userId
	 * @param {string} pokemon
	 * @returns {void} add data to teamsDatabase
	*/
	addPokemon(userId:string, pokemon: object):void {
		teamsDatabase[userId].push(pokemon)
	}

	/**
	 * @param {string} userId
	 * @param {object} team
	 * @returns {void} update all teamsDatabase
	*/
	setTeam(userId:string, team: object):void {
		teamsDatabase[userId] = team;
	}

	/**
	 * @returns {void} clear database
	 */
	cleanUpTeam():void {
		for(let user in teamsDatabase) {
			teamsDatabase[user] = [];
		}
	}
}
