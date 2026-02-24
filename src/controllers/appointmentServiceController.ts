import type Koa from "koa";
import * as svc from "../services/appointmentServiceService";

export async function listPublic(ctx: Koa.Context) {
  const rows = await svc.listPublicServices();
  ctx.body = { data: rows };
}

export async function getPublic(ctx: Koa.Context) {
  const { id } = ctx.params;
  const row = await svc.getPublicServiceById(id);
  ctx.body = { data: row };
}