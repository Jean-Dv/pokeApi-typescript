import express, { Application } from 'express'
import passport from 'passport';

import { init } from '../middleware/jwtToken';
import { teamsRouter } from '../apiServices/teams/teams.router';

export class Server {
	readonly app: Application;
	readonly routerPrefix: string;
	private listen: any;

	constructor() {
		this.app = express();
		this.routerPrefix = '/api/v1';
		this.config();
		this.middlewares();
		this.routes();
	}

	config():void {
		this.app.set("port", process.env.PORT || 3000);
	}

	middlewares():void {
		init();
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(passport.authenticate('jwt', {session:false}));
	}

	routes():void {
		this.app.use(`${this.routerPrefix}/teams`, teamsRouter);
	}

	start() {
		this.listen = this.app.listen(this.app.get("port"), () => {
			console.log(
				`[*] Server is running at http://localhost:${this.app.get("port")}`,
			)
		})
	}

	close() {
		this.listen.close();
	}
}
