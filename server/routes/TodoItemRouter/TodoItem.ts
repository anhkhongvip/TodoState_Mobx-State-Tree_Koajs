import { Context } from 'koa';
import Router from "koa-router";
import TodoItem  from "../../models/TodoItem"
const router = new Router();

// @route GET api/TodoItem
router.get('/', async (ctx : Context) => {
    try{
        const todoItems = await TodoItem.find();
        ctx.status = 200;
        ctx.body = { success:true,  todoItems};
    }
    catch(err) {
        console.log(err);
        ctx.status = 500;
        ctx.body = { success: false, message: 'Internal server error' }
    }
})

// @route POST api/TodoItem
router.post('/', async (ctx : Context) => {
    const {name, complete } = ctx.request.body as any;
    if(!name)
    {
        return(
            ctx.response.status = 400,
            ctx.body = { success: false, message: 'Name is required '}
            )
    }
    try {
        const newTodoItem = new TodoItem({
            name,
            complete : complete || 'False'
        })
        await newTodoItem.save();
        ctx.body = {success : true, message : 'Add successfully', newTodoItem }
    }
    catch(err)
    {
        console.log(err);
        ctx.status = 500;
        ctx.body = { success: false, message: 'Internal server error' }
    }
})

// @route PUT api/TodoItem
router.put('/:id', async (ctx : Context) => {
    const {name, complete } = ctx.request.body as any;
    if(!name)
    {
        return(
            ctx.response.status = 400,
            ctx.body = { success: false, message: 'Name is required '}
            )  
    }
    try{
        let updateTodo = {
            name: name,
            complete: complete,
        }
        const todoUpdateCondition = { _id : ctx.params.id }
        let Todo = await TodoItem.findOneAndUpdate(todoUpdateCondition, updateTodo, {
            new : true,
        });
        if(!Todo)
        {
            return( 
                ctx.response.status = 401,
                ctx.body = { success: false, message: 'TodoItem not found'}
                )
           
        }
        ctx.body = { success: true, message : 'Edit successfully', TodoItem : updateTodo}
    }
    catch(error){
        console.log(error);
        ctx.status = 500;
        ctx.body = { success: false, message: 'Internal server error' }
    }
})

// @route DELETE api/TodoItem
router.delete('/:id', async (ctx : Context) => {
    try{
        const todoDeleteCondition = { _id : ctx.params.id}
        let Todo = await TodoItem.findOneAndDelete(todoDeleteCondition)
        if(!Todo)
        {
            return(
                ctx.response.status = 401,
                ctx.body = { success: false, message : 'TodoItem not found'}
                )
            
        }
        ctx.body = { success: true, todoItem : Todo}
    }
    catch(error){
        console.log(error);
        ctx.status = 500;
        ctx.body = { success: false, message: 'Internal server error' }
    }
    
})
export default router;