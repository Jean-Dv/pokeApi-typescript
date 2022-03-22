import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

import { UserController } from "./auth.controller";
import { to } from "../../config/tools/to";

export const userController = new UserController();

export const loginUser = async(req: Request, res: Response) => {
	if (!req.body) {
		return res.status(400).json({ok: false, msg: 'Missing data'});
	} else if (!req.body.email || !req.body.password) {
		return res.status(400).json({ok: false, msg: 'Missing data'});
	}
	let [err, resp] = await to(userController.checkUserCredentials(req.body.email, req.body.password))
	if (!resp) {
		res.status(401).json({ok: false, message: 'Invalid credentials'})
	}
	let user = await userController.getUserId(req.body.email);
	const token = sign({userId: user}, 'secretPassword')
	res.status(200).json({token: token})
}
