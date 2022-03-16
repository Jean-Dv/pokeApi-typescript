import { Request, Response } from "express";
import passport from "passport";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

export const init = () => {
	const opts = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: 'secretPassword',
	}
	passport.use(new Strategy(opts, (decoded, done) => {
		console.log(decoded)
		return done(null, decoded)
	}))
}
