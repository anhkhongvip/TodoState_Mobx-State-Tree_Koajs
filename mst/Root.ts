import {
  Instance,
  onSnapshot,
  SnapshotIn,
  destroy,
  types,
  flow
} from 'mobx-state-tree';
import axios from "axios";
import { createContext, useContext } from "react";
import { TodoItemsModel } from './TodoListItems' 


export const TodoListModel = types
.model('TodoList', {
  name: types.string,
  todoItems: types.array(TodoItemsModel),
})
.actions(self => ({
    addTodoItem(
      todoItem : SnapshotIn<typeof TodoItemsModel> | Instance<typeof TodoItemsModel>
    ){
      self.todoItems.push(todoItem)
    },
    getTodoItem : flow(function*(){
      try{
        const response = yield axios.get("/api/TodoItem");
        self.todoItems = response.data.todoItems;
      }
      catch(error)
      {
        console.log(error);
      }
    }),
   removeTodo : ( id : string ) => {
    let index= self.todoItems.findIndex( item => item._id === id )
    self.todoItems.splice(index, 1)
   }
}));
const RootModel = types.model('Root', {
   todoList: TodoListModel,
});
let initialState = RootModel.create({
    todoList : {
        name : 'Todo State',
        todoItems : []
    }
});

export const rootStore = initialState;

onSnapshot(rootStore, (snapshot) => {
  console.log("Snapshot: ", snapshot);
});

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}


