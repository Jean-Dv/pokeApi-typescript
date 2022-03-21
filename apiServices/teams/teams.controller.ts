interface NamePokemon {
	[name: string]: any;
}
const teamsDatabase: { [key: string]: NamePokemon } = {};

export class TeamsController {
	constructor() {}
	
	/**
	 * @param {string} userId - Param userId 
	 * @returns {Promise<void>} This update team with user
	*/
	bootstrapTeam(userId: string):Promise<void> {
		return new Promise(async (resolve, reject) => {
			teamsDatabase[userId] = [];
			resolve();
		})
	}
	
	/**
	 * @param {string} userId
	 * @returns {Promise<NamePokemon>} - Structure of interface
	*/
	getTeamOfUser(userId: string): Promise<NamePokemon> {
		return new Promise(async (resolve, reject) => {
			resolve(teamsDatabase[userId]);
		})
	}
	
	/**
	 * @param {string} userId
	 * @param {string} pokemon
	 * @returns {Promise<void>} add data to teamsDatabase
	*/
	addPokemon(userId:string, pokemon: object): Promise<void> {
		return new Promise(async (resolve, reject) => {
			teamsDatabase[userId].push(pokemon);
			resolve();
		})
	}

	/**
	 * @param {string} userId
	 * @param {string} pokemonIndex
	 * @returns {Promise<void>} delete pokemon in the database
	 */
	deletePokemonAt(userId:string, pokemonIndex: number): Promise<void> {
		return new Promise(async (resolve, reject) => {
			if(teamsDatabase[userId][pokemonIndex]) {
				teamsDatabase[userId].splice(pokemonIndex, 1)
				resolve();
			}	
		})
	}

	/**
	 * @param {string} userId
	 * @param {object} team
	 * @returns {Promise<void>} update all teamsDatabase
	*/
	setTeam(userId:string, team: object): Promise<void> {
		return new Promise(async (resolve, reject) => {
			teamsDatabase[userId] = team;
			resolve();
		})
	}

	/**
	 * @returns {Promise<void>} clear database
	 */
	cleanUpTeam():Promise<void> {
		return new Promise(async (resolve, reject) => {
			for(let user in teamsDatabase) {
				teamsDatabase[user] = [];
				resolve();
			}
		})
	}
}
