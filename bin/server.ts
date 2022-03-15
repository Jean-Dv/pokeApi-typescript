import express, { Application } from 'express'

export class Server {
	readonly app: Application;
	readonly routerPrefix: string;
	private listen: any;

	constructor() {
		this.app = express();
		this.routerPrefix = '/api/v1';
		this.config();
		this.middlewares();
	}

	config():void {
		this.app.set("port", process.env.PORT || 3000);
	}

	middlewares():void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
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
