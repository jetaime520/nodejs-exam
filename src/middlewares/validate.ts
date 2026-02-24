import type Koa from "koa";
import type Joi from "joi";
import { AppError } from "../utils/appError";

type Target = "body" | "query" | "params";

export function validate(schema: Joi.Schema, target: Target = "body"): Koa.Middleware {
  return async (ctx, next) => {
    const data =
      target === "body" ? ctx.request.body :
      target === "query" ? ctx.query :
      ctx.params;

    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new AppError(
        400,
        "VALIDATION_ERROR",
        error.details.map((d) => d.message).join("; ")
      );
    }

    // 把清洗後的 value 放回去，避免拿到未過濾欄位
    if (target === "body") ctx.request.body = value;
    if (target === "query") (ctx.query as any) = value;
    if (target === "params") (ctx.params as any) = value;

    await next();
  };
}