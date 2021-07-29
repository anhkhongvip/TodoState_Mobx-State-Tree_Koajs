import mongoose, { Document } from 'mongoose';
const Schema = mongoose.Schema;

const TodoItemSchema = new Schema({
    id : {
        type : String,
        require : true,
    },
    name : {
        type : String,
        require : true,
    },
    complete :{
        type : String,
        enum : ['True', 'False']
    }
});

const TodoItem = module.exports = mongoose.model('todoItem', TodoItemSchema);
export default TodoItem;