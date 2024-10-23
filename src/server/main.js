import express from "express";
import ViteExpress from "vite-express";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import router from "./routes.js";
import initializePassport from "./passport_config.js";
import cookieParser from "cookie-parser";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";

const app = express();

dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    },
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

app.use("/", router);

ViteExpress.listen(app, 3000, () => console.log("Server is listening on port 3000..."));
