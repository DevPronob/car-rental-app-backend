/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
import {
  Strategy as GoogleStrategy,
} from "passport-google-oauth20";
import { User } from "../modules/user/user.model";

import { Strategy as LocalStrategy } from "passport-local";
import  bcrypt  from 'bcryptjs';


passport.use(
    new LocalStrategy({
          usernameField: "email",
        passwordField: "password"
    },async(email: string, password: string, done) =>{
        try {
             const isUserExist = await User.findOne({ email })

            if (!isUserExist) {
                return done("User does not exist")
            }
            const isGoogleAuthenticated =isUserExist.auths?.some((auth) =>auth.provider==="google")
            if(isGoogleAuthenticated && !isUserExist.password){
                return done(null,false,{message:"You have authenticated through Google. So if you want to login with credentials, then at first login with google and set a password for your Gmail and then you can login with email and password."})
            }
            const isPasswordValid =bcrypt.compare(password as string,isUserExist.password)
            if(!isPasswordValid){
                return done("Password Not Match")
            }
           return done(null,isUserExist)
        } catch (error) {
             console.log(error);
           return done(error)
        }
    })
)


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails?.[0].value;
      if (!email) return done(null, false, { message: "No email found" });

      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          email,
          name: profile.displayName,
          role: "RIDER",
          isBlocked: false,
          auths: [{ provider: "google", providerId: profile.id }],
        });
      }

      return done(null, user);
    }
  )
);


// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) => {
    done(null, user._id)
})

passport.deserializeUser(async (id: string, done: any) => {
    try {
        const user = await User.findById(id);
        done(null, user)
    } catch (error) {
        console.log(error);
        done(error)
    }
})