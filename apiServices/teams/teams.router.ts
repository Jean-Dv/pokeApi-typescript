import { Router } from 'express';

import {
	getTeamOfUser,
	setTeamOfUser,
	addPokemon
} from './teams.http';

export const teamsRouter = Router();

teamsRouter.route('/')
.get(getTeamOfUser)
.put(setTeamOfUser)

teamsRouter.route('/pokemon')
.post(addPokemon)
