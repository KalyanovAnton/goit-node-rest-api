import * as authService from "../services/authServices.js";

export const registerController = async (req, res) => {
  const newUser = await authService.registerUser(req.body);
  res.status(201).json({
    email: newUser.email,
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