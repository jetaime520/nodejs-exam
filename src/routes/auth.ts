import Router from "@koa/router";
import Joi from "joi";
import { validate } from "../middlewares/validate";
import * as ctrl from "../controllers/authController";

const router = new Router({ prefix: "/auth" });

router.post(
  "/register",
  validate(
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      name: Joi.string().min(1).required(),
    })
  ),
  ctrl.register
);

router.post(
  "/login",
  validate(
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
  ),
  ctrl.login
);

export default router;