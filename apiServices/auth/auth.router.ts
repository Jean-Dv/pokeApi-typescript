import express ,{ Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import { checkUserCredentials, getUserId } from './auth.controller';

export const authRouter = express.Router();

authRouter.route('/login')
.post((req: Request, res: Response) => {
	if (!req.body) {
		res.status(400).json({ok: false, msg: 'Missing data'})
	} else if (!req.body.email || !req.body.password) {
		res.status(400).json({ok: false, msg: 'Missing data'});
	}
	const { email, password } = req.body;
	const isValidUser = checkUserCredentials(email, password);
	if (!!!isValidUser) {
		res.status(401).json({ok: false, message: 'Invalid credentials'})
	}
	const token = sign({userId: getUserId(email)}, 'secretPassword')
	res.status(200).json({token: token})
})
