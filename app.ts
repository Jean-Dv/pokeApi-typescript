import { Server } from "./bin/server"; 

const server = new Server();
const routerPrefix = server.routerPrefix;
const appServer = server.app;

server.start();

export {server, appServer, routerPrefix};
