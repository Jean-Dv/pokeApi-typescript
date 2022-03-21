import { Router, Request, Response } from 'express';

import { TeamHttpHandler } from './teams.http';

export const teamsRouter = Router();
const teamHttpHandler = new TeamHttpHandler();

teamsRouter.route('/')
.get(teamHttpHandler.getTeamOfUser)
.put(teamHttpHandler.setTeamOfUser)

teamsRouter.route('/pokemons')
.post(teamHttpHandler.addPokemon)

teamsRouter.route('/pokemons/:pokeid')
.delete(teamHttpHandler.deletePokemon)
