import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import passport from "passport";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

dotenv.config();

const post_signup = [
  body("username", "Username is invalid").trim().isLength({ min: 3 }).toLowerCase().escape(),
  body("password", "Password is invalid").trim().isLength({ min: 6 }).escape(),
  body("confirmPassword", "Confirm Password must match Password")
    .trim()
    .custom((value, { req }) => {
      return value === req.body.password;
    }),
  expressAsyncHandler(async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      } else {
        const errors = validationResult(req);
        const usernameTaken = await prisma.user.findFirst({
          where: {
            username: req.body.username
          }
        });
        if (!errors.isEmpty() || usernameTaken) {
          res.status(200).json(false);
          return;
        }
        await prisma.user.create({
          data: {
            username: req.body.username,
            password: hashedPassword
          }
        });
        res.status(200).json(true);
      }
    });
  })
];

export const login = [
  expressAsyncHandler(async (req, res, next) => {
    const user = await prisma.user.findFirst({
      where: {
        username: req.body.username
      }
    });
    if (!user) {
      res.status(200).json(user);
      return;
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      res.status(200).json(user);
      return;
    }
    next();
  }),
  passport.authenticate("local"),
  (req, res, next) => {
    res.status(200).json(req.user);
  }
];

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

export const get_user = expressAsyncHandler(async (req, res, next) => {
  const user = await prisma.user.findFirst({
    where: {
      id: req.params.id
    }
  });
  res.status(200).json(user);
});

export default post_signup;
