import { Router, Request, Response } from 'express';

import { UserController } from '../auth/auth.controller';
import { getTeamOfUser, setTeam } from './teams.controller';

const userController = new UserController()
export const teamsRouter = Router();

teamsRouter.route('/')
.get((req: Request | any, res: Response) => {
	let user = userController.getUser(req.user.userId);
	res.status(200).json({
		ok: true,
		trainer: user.email,
		team: getTeamOfUser(req.user.userId)
	})
})
.put((req: Request | any , res: Response) => {
	setTeam(req.user.userId, req.body.team)
	res.status(200).json({ok: true, msg: ''})
})

teamsRouter.route('/pokemons')
.post((req: Request, res: Response) => {
	res.status(200).send('Hello World!')
})
