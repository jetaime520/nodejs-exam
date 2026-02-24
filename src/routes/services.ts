import Router from "@koa/router";
import Joi from "joi";
import { validate } from "../middlewares/validate";
import * as ctrl from "../controllers/appointmentServiceController";

const router = new Router({ prefix: "/services" });

router.get("/", ctrl.listPublic);

router.get(
  "/:id",
  validate(Joi.object({ id: Joi.string().uuid().required() }), "params"),
  ctrl.getPublic
);

export default router;