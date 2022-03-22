import { TeamModel } from "./teams.model";

export const storeTeam = async(teamDb: {userId: string, team:[]}) => {
	const { userId, team } = teamDb;
	const newTeam = new TeamModel({
		userId,
		team,
	})
	await newTeam.save();
	return teamDb;
}
