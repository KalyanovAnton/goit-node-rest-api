import User from "../db/models/User.js";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwtToken.js";

export const findUser = (where) => User.findOne({ where });

export const registerUser = async (payload) => {
  const user = await User.findOne({ where: { email } });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(payload.password, 10);
  return User.create({ ...payload, password: hashPassword });
};

export const loginUser = async ({ email, password }) => {
  const user = await findUser({ email });
  if (!user) throw HttpError(401, "email or password invalid");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "email or password invalid");

  const payload = {
    id: user.id,
  };
  const token = createToken(payload);
  return token;
};


export const updateUser = async (id, data) => {
  const user = await findUser({ id });
  if (!user) return null;
  return await user.update(data);
};
