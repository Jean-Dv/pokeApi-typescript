import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

import { routerPrefix } from "../app";

export class MiddlewareJson {
	init() {
		const opts = {
			jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
			secretOrKey: 'secretPassword'
		}
		passport.use(new Strategy(opts, (decoded, done) => {
			return done(null, decoded)
		}))
	}

	passportJwtMiddeware(req: Request, res: Response, next: NextFunction) {
		if (req.url === `${routerPrefix}/` 
		|| req.url === `${routerPrefix}/auth/login`){
			return next();
		}
		return passport.authenticate('jwt', {session:false})(req, res, next)
	}
}
