import { sequelize } from "./sequelize";
import { User } from "./User";
import { AppointmentService } from "./AppointmentService";

export { sequelize, User, AppointmentService };

export async function initDb() {
  await sequelize.authenticate();
}

export async function closeDb() {
  await sequelize.close();
}