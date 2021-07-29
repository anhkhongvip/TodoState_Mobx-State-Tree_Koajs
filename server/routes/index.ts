import Router from "koa-router";
import TodoItem from "./TodoItemRouter/TodoItem";

const router = new Router();

router.use('/api/TodoItem',TodoItem.routes());

export default router;

