import type Koa from "koa";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError";

type JwtPayload = { id: string; email: string };

export function authJwt(): Koa.Middleware {
  return async (ctx, next) => {
    const auth = ctx.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      throw new AppError(401, "UNAUTHORIZED", "Missing bearer token");
    }

    const token = auth.slice("Bearer ".length).trim();

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      ctx.state.user = payload; // 後面需要 user info 可以用
      await next();
    } catch {
      throw new AppError(401, "UNAUTHORIZED", "Invalid token");
    }
  };
}