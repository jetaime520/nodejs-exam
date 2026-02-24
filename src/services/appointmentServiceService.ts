import { AppointmentService } from "../models";
import { Op } from "sequelize";

export async function listPublicServices() {
  return AppointmentService.findAll({
    where: {
      isPublic: true,
      isRemove: false,
    },
    order: [
      ["order", "ASC"],
      ["createdAt", "ASC"],
    ],
  });
}

export async function getPublicServiceById(id: string) {
  return AppointmentService.findOne({
    where: {
      id,
      isPublic: true,
      isRemove: false,
    },
  });
}