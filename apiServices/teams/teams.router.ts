import { Router, Request, Response } from 'express';

import { getTeamOfUser, setTeamOfUser } from './teams.http';

export const teamsRouter = Router();

teamsRouter.route('/')
.get(getTeamOfUser)
.put(setTeamOfUser)

teamsRouter.route('/pokemons')
.post((req: Request, res: Response) => {
	res.status(200).send('Hello World!')
})
