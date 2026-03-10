import { emailRegex } from "../../schemas/contactsSchemas.js";
import sequelize from "../sequelize.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("user", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: emailRegex,
    },
    unique: {
      args: true,
      msg: "email alreay exist",
    },
  },

  avatarURL: {
    type: DataTypes.STRING,
  },

  subscription: {
    type: DataTypes.ENUM,
    values: ["starter", "pro", "business"],
    defaultValue: "starter",
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  verify: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationToken: {
    type: DataTypes.STRING,
  },
});

await User.sync({ alter: true });

export default User;
