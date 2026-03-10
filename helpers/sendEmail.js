import nodemailer from "nodemailer";
import "dotenv/config";

const { EMAIL_PASSWORD, UKR_NET_EMAIL } = process.env;

const config = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async (data) => {
  const email = { ...data, from: UKR_NET_EMAIL };
  await transporter.sendMail(email);
  return true;
};

export default sendEmail;
