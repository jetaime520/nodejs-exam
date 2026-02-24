import Router from "@koa/router";
import Joi from "joi";
import { validate } from "../middlewares/validate";
import { authJwt } from "../middlewares/authJwt";
import * as ctrl from "../controllers/appointmentServiceAdminController";

const router = new Router({ prefix: "/admin/services" });

router.use(authJwt());

router.post(
  "/",
  validate(
    Joi.object({
      name: Joi.string().min(1).required(),
      description: Joi.string().allow(null, "").optional(),
      price: Joi.number().integer().min(0).required(),
      showTime: Joi.number().integer().min(1).required(),
      order: Joi.number().integer().min(0).optional(),
      isPublic: Joi.boolean().optional(),
      ShopId: Joi.string().uuid().allow(null, "").optional(),
    })
  ),
  ctrl.create
);

router.put(
  "/:id",
  validate(Joi.object({ id: Joi.string().uuid().required() }), "params"),
  validate(
    Joi.object({
      name: Joi.string().min(1).optional(),
      description: Joi.string().allow(null, "").optional(),
      price: Joi.number().integer().min(0).optional(),
      showTime: Joi.number().integer().min(1).optional(),
      order: Joi.number().integer().min(0).optional(),
      isPublic: Joi.boolean().optional(),
      ShopId: Joi.string().uuid().allow(null, "").optional(),
    })
  ),
  ctrl.update
);

router.delete(
  "/:id",
  validate(Joi.object({ id: Joi.string().uuid().required() }), "params"),
  ctrl.remove
);

export default router;