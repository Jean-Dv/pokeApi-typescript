import request from 'supertest';

import { appServer, server, routerPrefix } from '../app';
import { UserController } from '../apiServices/auth/auth.controller';
import {TeamsController} from '../apiServices/teams/teams.controller';

const userController = new UserController();
const teamsDatabase = new TeamsController();

beforeEach(() => {
	userController.registerUser('admin@admin.com', '1234')
})

afterEach(() => {
	userController.cleanUpUsers()
	teamsDatabase.cleanUpTeam();
})

describe('Suite of test teams', () => {
	test('should return the team of the given user', async () => {
		let team = [{name: 'Charizard'}, {name: 'Blastoise'}, {name: 'Picachu'}];
		const responseLogin = await request(appServer)
			.post(`${routerPrefix}/auth/login`)
			.set('Accept', 'application/json')
			.send({email: 'admin@admin.com', password: '1234'});
		let token = responseLogin.body.token;
		expect(responseLogin.statusCode).toBe(200);
		const responsePutTeam = await request(appServer)
			.put(`${routerPrefix}/teams`)
			.set('Authorization', `JWT ${token}`)
			.send({ team: team });
		expect(responsePutTeam.statusCode).toBe(200);
		const responseGetTeam = await request(appServer)
			.get(`${routerPrefix}/teams`)
			.set('Authorization', `JWT ${token}`);
		expect(responseGetTeam.statusCode).toBe(200);
		expect(responseGetTeam.body.trainer).toContain('admin@admin.com');
		expect(responseGetTeam.body.team.length).toBe(team.length);
		expect(responseGetTeam.body.team[0].name).toContain(team[0].name);
		expect(responseGetTeam.body.team[1].name).toContain(team[1].name);
	});
	test('should return the pokedex number', async () => {
		let pokemonName = 'Bulbasaur';
		const responseLogin = await request(appServer)
			.post(`${routerPrefix}/auth/login`)
			.set('Accept', 'application/json')
			.send({email: 'admin@admin.com', password: '1234'});
				expect(responseLogin.statusCode).toBe(200);
				let token = responseLogin.body.token;
				const responsePostPokemon = await request(appServer)
					.post(`${routerPrefix}/teams/pokemon`)
					.send({name: pokemonName})
					.set('Authorization', `JWT ${token}`);
					expect(responsePostPokemon.statusCode).toBe(201);
					const responseGetTeam = await request(appServer)
						.get(`${routerPrefix}/teams`)
						.set('Authorization', `JWT ${token}`)
						expect(responseGetTeam.statusCode).toBe(200);
						expect(responseGetTeam.body.trainer).toContain('admin@admin.com');
						expect(responseGetTeam.body.team.length).toBe(1);
						expect(responseGetTeam.body.team[0].name).toContain(pokemonName);
						expect(responseGetTeam.body.team[0].pokedexNumber).toBe(1);
	})
})

afterAll(() => {
	server.close();
})
