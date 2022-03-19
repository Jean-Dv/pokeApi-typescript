import { Request, Response } from "express"

import { UserController } from '../auth/auth.controller';
import { TeamsController } from './teams.controller';

const userController = new UserController();
const teamsController = new TeamsController();

export const getTeamOfUser = (req: Request | any, res: Response) => {
	let user = userController.getUser(req.user.userId);
	res.status(200).json({
		ok: true,
		trainer: user.email,
		team: teamsController.getTeamOfUser(req.user.userId)
	})
}

export const setTeamOfUser = (req: Request | any, res: Response) => {
	teamsController.setTeam(req.user.userId, req.body.team)
	res.status(200).json({ok: true, msg: ''})
}
