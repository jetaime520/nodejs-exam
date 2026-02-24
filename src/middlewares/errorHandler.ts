import type Koa from "koa";

export function errorHandler(): Koa.Middleware {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err: any) {
      const status = err?.status ?? 500;

      ctx.status = status;
      ctx.body = {
        error: {
          code: err?.code ?? "INTERNAL_ERROR",
          message: status === 500 ? "Internal server error" : (err?.message ?? "Error"),
        },
      };

      // 500 才印出來方便你開發 debug；正式可換 logger
      if (status === 500) {
        console.error(err);
      }
    }
  };
}