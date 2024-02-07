import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      res.status(500).send({
        success: false,
        message: "server error",
      });
    }
    const userPayload = jwt.verify(token, "itsasecret");
    const response = await UserModel.findOne({ email: userPayload.email });
    if (response._id && !response.block) {
      next();
    } else {
      res.status(500).send({
        success: false,
        message: "User is Blocked, Try again after login in",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};
