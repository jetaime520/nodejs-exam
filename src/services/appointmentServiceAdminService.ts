import { AppError } from "../utils/appError";
import * as repo from "../repositories/appointmentServiceRepo";

export async function create(payload: {
  name: string;
  description?: string | null;
  price: number;
  showTime: number;
  order?: number;
  isPublic?: boolean;
  ShopId?: string | null;
}) {
  return repo.createService(payload);
}

export async function update(id: string, patch: any) {
  const row = await repo.updateService(id, patch);
  if (!row) throw new AppError(404, "SERVICE_NOT_FOUND", "Service not found");
  return row;
}

export async function remove(id: string) {
  const row = await repo.softDeleteService(id);
  if (!row) throw new AppError(404, "SERVICE_NOT_FOUND", "Service not found");
  return row;
}