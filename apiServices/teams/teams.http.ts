import { Request, Response } from "express"
import axios from 'axios';

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

export const addPokemon = (req: Request | any, res: Response) => {
	let pokemonName = req.body.name;
	axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
		.then(function (response) {
			let pokemon = {
				name: pokemonName,
				pokedexNumber: response.data.id,
			}
			teamsController.addPokemon(req.user.userId, pokemon)
			res.status(201).json(pokemon)
	})
	.catch(function (err) {
		console.log(err);
		res.status(400).json({message: err})
	})
	.then(function() {

	})
}
