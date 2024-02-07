import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import axios from "axios";

export const userLogin = async (req, res) => {
  try {
    const { googleAuthtoken } = req.body;
    if (!googleAuthtoken) {
      res
        .status(500)
        .send({ success: false, message: "Server is busy, Try Again Later!" });
    }
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${googleAuthtoken}`,
        },
      }
    );
    const name = response.data.given_name;
    const email = response.data.email;
    const userExist = await UserModel.findOne({ email });
    if (!userExist) {
      const response = await UserModel.create({ name, email });
      if (!response) {
        res.status(500).send({
          success: false,
          message: "Server is busy, Try Again Later!",
        });
      }
    }

    const token = jwt.sign({ name, email }, "itsasecret");
    res.send({ success: true, message: "User Logged In", token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};

export const savePassword = async (req, res) => {
  try {
    const { content } = req.body;
    const user = jwt.verify(req.headers["authorization"], "itsasecret");
    const response = await UserModel.updateOne(
      { email: user.email },
      { $addToSet: { passwords: content } },
      { new: true }
    );
    if (!response) {
      res
        .status(500)
        .send({ success: false, message: "Unable to store now, Try Later" });
    }
    res
      .status(200)
      .send({ success: true, message: "Generated Password's stored!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};

export const getPasswords = async (req, res) => {
  try {
    const user = jwt.verify(req.headers["authorization"], "itsasecret");
    const { search } = req.query;
    let query = { email: user.email };
    const searchRegex=new RegExp(search,"i")
    const response = await UserModel.findOne(query);
    if (!response) {
      res.status(500).send({
        success: false,
        message: "Server is busy, Try Again Later!",
      });
    }
    const passwords=response.passwords.filter((pass)=>searchRegex.test(pass))
    // console.log(passwords);
    res.status(200).send({
      success: true,
      message: "passwords fetched",
      passwords,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};

export const removePassword = async (req, res) => {
  try {
    const { passId } = req.body;
    const user = jwt.verify(req.headers["authorization"], "itsasecret");
    const response = await UserModel.updateOne(
      { email: user.email },
      { $pull: { passwords: { _id: passId } } },
      { new: true }
    );
    if (!response) {
      res.status(500).send({
        success: false,
        message: "Server is busy, Try Again Later!",
      });
    }
    res.status(200).send({ success: true, message: "Removed the password" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};
