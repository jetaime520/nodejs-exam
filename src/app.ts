import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import router from "./routes";

const app = new Koa();

// middleware 順序很重要：錯誤處理要放最前面
app.use(errorHandler());
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

// 放在 router 後面
app.use(notFound());

export default app;