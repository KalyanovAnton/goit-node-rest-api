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
      is: emailRegex
    },
    unique: {
      args: true,
      msg: "email alreay exist"
    },
  },
  subscription: {
      type: DataTypes.ENUM,
      values: ["starter", "pro", "business"],
      defaultValue: "starter"
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

await User.sync({ alter: true });

export default User