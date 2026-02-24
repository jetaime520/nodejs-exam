import Router from "@koa/router";
import servicesRouter from "./services";
import authRouter from "./auth";
import adminServicesRouter from "./adminServices";
import Joi from "joi";
import { validate } from "../middlewares/validate";

const router = new Router();

router.get("/health", async (ctx) => {
  ctx.body = { data: { status: "ok" } };
});

// demo：POST /demo 需要 { name: string }
router.post(
  "/demo",
  validate(Joi.object({ name: Joi.string().min(1).required() })),
  async (ctx) => {
    const body = (ctx.request as any).body;
    ctx.body = { data: { hello: body.name } };
    //ctx.body = { data: { hello: ctx.request.body.name } };
  }
);
router.use(servicesRouter.routes(), servicesRouter.allowedMethods());
router.use(authRouter.routes(), authRouter.allowedMethods());
router.use(adminServicesRouter.routes(), adminServicesRouter.allowedMethods());
export default router;