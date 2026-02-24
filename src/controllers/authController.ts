import type Koa from "koa";
import * as auth from "../services/authService";

export async function register(ctx: Koa.Context) {
  const { email, password, name } = (ctx.request as any).body;

  const user = await auth.register(email, password, name);

  ctx.body = {
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
}

export async function login(ctx: Koa.Context) {
  const { email, password } = (ctx.request as any).body;

  const { user, token } = await auth.login(email, password);

  ctx.body = {
    data: {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    },
  };
}

