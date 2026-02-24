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

export async function createService(data: {
  name: string;
  description?: string | null;
  price: number;
  showTime: number;
  order?: number;
  isPublic?: boolean;
  ShopId?: string | null;
}) {
  return AppointmentService.create({
    name: data.name,
    description: data.description ?? null,
    price: data.price,
    showTime: data.showTime,
    order: data.order ?? 0,
    isPublic: data.isPublic ?? true,
    isRemove: false,
    ShopId: data.ShopId ?? null,
  });
}

export async function getById(id: string) {
  return AppointmentService.findByPk(id);
}

export async function updateService(
  id: string,
  patch: Partial<{
    name: string;
    description: string | null;
    price: number;
    showTime: number;
    order: number;
    isPublic: boolean;
    ShopId: string | null;
  }>
) {
  const row = await AppointmentService.findByPk(id);
  if (!row) return null;

  await row.update(patch);
  return row;
}

export async function softDeleteService(id: string) {
  const row = await AppointmentService.findByPk(id);
  if (!row) return null;

  await row.update({ isRemove: true });
  return row;
}