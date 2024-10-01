import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { createService, readByEmailService } from "../service/users.service.js";
import { compareHash } from "../utils/hash.js";
import { createToken } from "../utils/jwt.js";
import CustomStrategy from "passport-custom";
import { verifyToken } from "../utils/jwt.js";
import { sendEmail } from "../utils/nodemailer.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const one = await readByEmailService(email);
        if (one) {
          const error = new Error(
            "A user with this email has already been created!"
          );
          error.statusCode = 400;
          return done(error);
        } else {
          const one = await createService(req.body);
          const data = {
            to: email,
            name: one.name,
            verifyCode: one.verifyCode,
          };
          await sendEmail(data);
          return done(null, one);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      const one = await readByEmailService(email);
      if (!one) {
        const error = new Error("Bad auth!");
        error.statusCode = 400;
        return done(error);
      } else {
        const correct = compareHash(password, one.password);
        if (!correct || !one.verify) {
          const error = new Error("Invalid credentials!");
          error.statusCode = 400;
          return done(error);
        } else {
          delete one.password;
          const token = createToken(one);
          req.token = token;
          return done(null, token);
        }
      }
    }
  )
);

passport.use(
  "data",
  new CustomStrategy(async (req, done) => {
    try {
      const token = req.cookies.token;
      if (token) {
        const data = verifyToken(token);
        const one = {
          email: data.email,
          name: data.name,
          role: data.role,
          photo: data.photo,
          _id: data._id,
        };
        req.body = one;
        return done(null, one);
      } else {
        const error = new Error("You must login first!");
        error.statusCode = 400;
        return done(error);
      }
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  "Google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://harmonious-connection-production.up.railway.app/api/sessions/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const exists = await readByEmailService(profile.email);
        if (!exists) {
          const one = {
            email: profile.email,
            name: profile.name.givenName,
            photo: profile.picture,
            password: profile.id,
            verify: true,
          };
          await createService(one);
        }
        const two = await readByEmailService(profile.email);
        const data = {
          email: two.email,
          name: two.name,
          role: two.role,
          photo: two.photo,
          _id: two._id,
        };
        const token = createToken(data);
        req.token = token
        return done(null, token);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
