import { HttpError } from "../helpers/HttpError.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { SECRET_KEY } = process.env;

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email is already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.json({
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password invalid");
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const { _id: id } = req.user;

    await User.findByIdAndUpdate(id, { token: null });

    res.status(204).json();
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const current = async (req, res) => {
  try {
    const { email, subscription } = req.user;

    res.json({
      email,
      subscription,
    });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const { subscription } = req.body;

    const user = await User.findById(id);
    user.subscription = subscription;
    await user.save();

    res.json({
      message: "Subscription updated",
      email: user.email,
      subscription: `Now subscription is ${subscription}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
