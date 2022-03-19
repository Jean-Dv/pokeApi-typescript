interface NamePokemon {
	[name: string]: any;
}
const teamsDatabase: { [key: string]: NamePokemon } = {};

export const bootstrapTeam = (userId: string) => {
	teamsDatabase[userId] = []; 
}

export const getTeamOfUser = (userId: string) => {
	return teamsDatabase[userId];
}

export const addPokemon = (userId: string, pokemonName: string) => {
	teamsDatabase[userId].push({name: pokemonName});
}

export const setTeam = (userId: string, team: object) => {
	teamsDatabase[userId] = team;
}
