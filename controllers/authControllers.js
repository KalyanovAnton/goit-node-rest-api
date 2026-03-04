import HttpError from "../helpers/HttpError.js";
import * as authService from "../services/authServices.js";
import path from "node:path";
import fs from "node:fs/promises";

const avatarsDir = path.resolve("public", "avatars");

export const registerController = async (req, res) => {
  const newUser = await authService.registerUser(req.body);
  res.status(201).json({
    email: newUser.email,
    avatarURL: newUser.avatarURL,
  });
};

export const loginController = async (req, res) => {
  const token = await authService.loginUser(req.body);
  res.json({
    token,
  });
};

export const logoutController = async (req, res) => {
  const { id } = req.user;

  await authService.updateUser(id, { token: null });

  res.status(204).send();
};

export const getCurrentController = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

export const updateAvatarController = async (req, res) => {
  if (!req.file) return HttpError(400, "File is required");
  const { id } = req.user;
  const { path: tempUpload, filename } = req.file;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = `/avatars/${filename}`;
  await authService.updateUser(id, { avatarURL });

  res.status(200).json({avatarURL})
};
