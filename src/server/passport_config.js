import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initializePassport = (passport) => {
  passport.use(
    new Strategy(async (username, password, done) => {
      try {
        const lowerCasedUsername = username.toLowerCase();
        const user = await prisma.user.findUnique({
          where: {
            username: lowerCasedUsername
          }
        });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id
        }
      });
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

export default initializePassport;
