import express, { Application } from 'express'

import { teamsRouter } from '../apiServices/teams/teams.router';
import { authRouter } from '../apiServices/auth/auth.router';
import { MiddlewareJson } from '../middleware/jwtToken';

const middlewareJwtPassport = new MiddlewareJson();

export class Server {
	readonly app: Application;
	readonly routerPrefix: string;
	private listen: any;

	constructor() {
		this.app = express();
		this.routerPrefix = '/api/v1';
		this.middlewares();
		this.config();
		this.routes();
	}

	config():void {
		this.app.set("port", process.env.PORT || 3000);
	}

	middlewares():void {
		middlewareJwtPassport.init();
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(middlewareJwtPassport.passportJwtMiddeware);
	}

	routes():void {
		this.app.use(`${this.routerPrefix}/teams`, teamsRouter);
		this.app.use(`${this.routerPrefix}/auth`, authRouter);
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
