import type Koa from "koa";

export function notFound(): Koa.Middleware {
  return async (ctx, next) => {
    await next();

    // 若沒有任何 route 處理到，Koa 的 status 會是 404（或 body 仍為空）
    if (ctx.status === 404 && !ctx.body) {
      ctx.body = {
        error: { code: "NOT_FOUND", message: "Not Found" },
      };
    }
  };
}