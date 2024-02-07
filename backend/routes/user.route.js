import express from "express";
import {
  getPasswords,
  removePassword,
  savePassword,
  userLogin,
} from "../controllers/user.controllers.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const Router = express.Router();

Router.post("/login", (req, res) => userLogin(req, res));

Router.get(
  "/password",
  (req, res, next) => isLoggedIn(req, res, next),
  (req, res) => getPasswords(req, res)
);

Router.patch(
  "/password/remove",
  (req, res, next) => isLoggedIn(req, res, next),
  (req, res) => removePassword(req, res)
);

Router.post(
  "/password/save",
  (req, res, next) => isLoggedIn(req, res, next),
  (req, res) => savePassword(req, res)
);

export default Router;
