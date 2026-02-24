import type Koa from "koa";
import * as svc from "../services/appointmentServiceAdminService";

export async function create(ctx: Koa.Context) {
  const body = (ctx.request as any).body;
  const row = await svc.create(body);
  ctx.body = { data: row };
}

export async function update(ctx: Koa.Context) {
  const { id } = ctx.params;
  const body = (ctx.request as any).body;
  const row = await svc.update(id, body);
  ctx.body = { data: row };
}

export async function remove(ctx: Koa.Context) {
  const { id } = ctx.params;
  const row = await svc.remove(id);
  ctx.body = { data: row };
}