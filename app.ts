import { Server } from "./bin/server";
import dotenv from 'dotenv';

dotenv.config();
import { UserController } from './apiServices/auth/auth.controller';
const server = new Server();
const routerPrefix = server.routerPrefix;
const appServer = server.app;
const userController = new UserController();
userController.registerUser('admin@admin.com', '1234')

server.start();

export {server, appServer, routerPrefix};
