import express, { Application } from 'express';

import { teamsRouter } from '../apiServices/teams/teams.router';
import { authRouter } from '../apiServices/auth/auth.router';
import { MiddlewareJson } from '../middleware/jwtToken';
import { getUri, connect } from '../services/mongoDb';

const middlewareJwtPassport = new MiddlewareJson();

export class Server {
	readonly app: Application;
	readonly routerPrefix: string;
	private listen: any;
	private uri: Promise<string>;

	constructor() {
		this.uri = getUri();
		this.app = express();
		this.config();
		this.routerPrefix = '/api/v1';
		this.middlewares();
		this.routes();
		this.databaseConnection();
	}

	private config():void {
		this.app.set("port", process.env.PORT || 3000);
	}

	private middlewares():void {
		middlewareJwtPassport.init();
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(middlewareJwtPassport.passportJwtMiddeware);
	}

	private routes():void {
		this.app.use(`${this.routerPrefix}/teams`, teamsRouter);
		this.app.use(`${this.routerPrefix}/auth`, authRouter);
	}

	private async databaseConnection() {
		await connect(this.uri);
	}

	start():void {
		this.listen = this.app.listen(this.app.get("port"), () => {
			console.log(
				`[*] Server is running at http://localhost:${this.app.get("port")}`,
			)
		})
	}

	close():void {
		this.listen.close();
	}
}
