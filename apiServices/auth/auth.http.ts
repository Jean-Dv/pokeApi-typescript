import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

import { UserController } from "./auth.controller";

export const userController = new UserController();

export const loginUser = (req: Request, res: Response) => {
	if (!req.body) {
		res.status(400).json({ok: false, msg: 'Missing data'})
	} else if (!req.body.email || !req.body.password) {
		res.status(400).json({ok: false, msg: 'Missing data'});
	}
	const { email, password } = req.body;
	const isValidUser = userController.checkUserCredentials(email, password);
	if (!isValidUser) {
		res.status(401).json({ok: false, message: 'Invalid credentials'})
	}
	let user = userController.getUserId(req.body.email);
	const token = sign({userId: user}, 'secretPassword')
	res.status(200).json({token: token})
}
