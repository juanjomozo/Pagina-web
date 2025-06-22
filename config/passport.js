import passport from 'passport';
import config from "../config/env.js";
import session from 'express-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import  { Strategy, ExtractJwt }  from "passport-jwt";
import User from '../models/User.js';

passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: "http://localhost:3000/auth/google/callback",
},
	async (accessToken, refreshToken, profile, done) => {
		try {
			// Buscar o crear usuario en la DB
			let user = await User.findOne({ where: { googleId: profile.id } });

			if (!user) {
				user = await User.create({
					googleId: profile.id,
					displayName: profile.displayName,
					email: profile.emails[0].value,
					avatar: profile.photos[0].value,
				});
			}

			done(null, user);
		} catch (error) {
			done(error, null);
		}
	}
));


const Opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.jwtSecret
}

export default new Strategy(Opts, async (payload, done) => {
	try {
		// If the token expired, raize unauthorized
		const expirationDate = new Date(payload.exp * 1000);
		if (expirationDate < new Date()) return done(null, false);
		let user = await User.findOne({ where: { googleId: profile.id } });
		// Si no ha expirado entonces busca el usuario en la DB y extrae el email
		if (user) {
			return done(null, user);
		}

		return done(null, false);
	} catch (error) {
		console.log(error)
	}
})


passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findByPk(id);
		done(null, user);
	} catch (error) {
		done(error, null);
	}
});


