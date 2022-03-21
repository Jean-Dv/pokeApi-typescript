import { Request, Response } from "express"
import axios from 'axios';

import { UserController } from '../auth/auth.controller';
import { TeamsController } from './teams.controller';
import { to } from "../../config/tools/to";

const userController = new UserController();
const teamsController = new TeamsController();
export class TeamHttpHandler {

	constructor() {};
	
	/**
	 * @param {Request|any} req -> Petición del cliente
	 * @param {Response} res -> Respuesta del servidor
	 * @return {void} status(200)
	 */
	async getTeamOfUser(req: Request | any, res: Response): Promise<void> {
		let user = await userController.getUser(req.user.userId);
		let [teamErr, team] = await to(teamsController.getTeamOfUser(req.user.userId));
		if (teamErr) {
			res.status(400).json({message: teamErr})
		}
		res.status(200).json({
			ok: true,
			trainer: user.email,
			team: team 
		})
	}

	/**
	 * @param {Request|any} req -> Petición del cliente
	 * @param {Response} res -> Respuesta del servidor
	 * @return {void} status(200)
	 */
	async setTeamOfUser(req: Request | any, res: Response): Promise<void> {
		let [err, resp] = await to(teamsController.setTeam(req.user.userId, req.body.team))
		if(err) {
			res.status(400).json({msg: err})
		}
		res.status(200).json({ok: true, msg: 'Team added succesfully.'})
	}

	/**
	 * @param {Request|any} req -> Petición del cliente
	 * @param {Response} res -> Respuesta del servidor
	 * @return {void} status(200)
	 */
	async addPokemon(req: Request | any, res: Response): Promise<void> {
		let pokemonName = req.body.name;
		let [pokeApiErr, pokeApiResp] =
			await to(axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`));
		if(pokeApiErr) {
			res.status(400).json({msg: pokeApiErr});
		}
		let pokemon = {
			name: pokemonName,
			pokedexNumber: pokeApiResp.data.id
		};
		let [errAdd, resp] = await to(teamsController.addPokemon(req.user.userId, pokemon));
		if(errAdd) {
			res.status(400).json({msg: errAdd})
		}
		res.status(201).json({ok: true, msg: 'Pokemon added succesfully'})
	}
	/**
	 * @param {Request|any} req -> Petición del cliente
	 * @param {Response} res -> Respuesta del servidor
	 * @return {void} status(200)
	 */
	async deletePokemon(req: Request | any, res: Response): Promise<void> {
		let [err, resp] =
			await to(teamsController.deletePokemonAt(req.user.userId, req.params.pokeid));
		if(err) {
			res.status(400).json({ok: false, msg: err})
		}	
		res.status(200).json({ok: true, msg: 'Delete pokemon succesfully'})
	}
}
