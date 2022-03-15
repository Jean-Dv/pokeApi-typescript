import { Request, Response } from "express";
import { Server } from "./bin/server"; 

const server = new Server();
const routerPrefix = server.routerPrefix;
const appServer = server.app;

appServer.get(`${routerPrefix}/teams`, (req: Request, res: Response) => {
	if (req.body.token) {
		res.status(200).json();
	}
	res.status(401).send('Hello World!');
})

server.start();

export {server, appServer, routerPrefix};
