import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: "dpg-d6cmq4ogjchc739oam20-a.oregon-postgres.render.com",
  username: "db_contacts_npp0_user",
  database: "db_contacts_npp0",
  password: "vaFqCyXcTJrJvut5bHWlmqYj40v4xmAe",
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
