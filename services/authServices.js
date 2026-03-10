import User from "../db/models/User.js";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import { createToken } from "../helpers/jwtToken.js";
import gravatar from "gravatar";
import { nanoid } from "nanoid";
import sendEmail from "../helpers/sendEmail.js";

export const findUser = (where) => User.findOne({ where });

export const registerUser = async (payload) => {
  const { email, password } = payload;
  const user = await User.findOne({ where: { email } });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email, { s: "250", d: "identicon" }, true);

  const hashPassword = await bcrypt.hash(payload.password, 10);
  const verificationToken = nanoid();

  const newUser = User.create({
    ...payload,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verificationEmail = {
    to: email,
    subject: "Підтвердження реєстрації",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Натисніть тут для підтвердження email</a>`,
  };

  await sendEmail(verificationEmail)

  return newUser;
};

export const loginUser = async ({ email, password }) => {
  const user = await findUser({ email });
  if (!user) throw HttpError(401, "email or password invalid");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw HttpError(401, "email or password invalid");
  
  if(!user.verify){
    throw HttpError(401, "Email not verified. Please confirm your email first.")
  }
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

export const verifyUser = async (verificationToken) => {
  const user = await User.findOne({ where: { verificationToken } });
  if (!user) return null;
  await user.update({
    verify: true,
    verificationToken: null,
  });

  return true;
};


export const resendVerificationEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw HttpError(404, 'User not found');
  
  if(user.verify){
    throw HttpError(400, "Verification has already been passed")
  }
  const verificationEmail = {
    to: email,
    subject: "Повторне підтвердження реєстрації",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${user.verificationToken}">Натисніть тут для підтвердження email</a>`,
  };

  await sendEmail(verificationEmail);

  return true;
};