import { types, getParent} from 'mobx-state-tree';
export const TodoItemsModel = types
.model('TodoItems', {
    _id: types.identifier,
    name: types.string,
    complete: types.string,
  })
.actions(self =>({
  editTodoItem(newName : string, newComplete : string){
    self.name = newName;
    self.complete = newComplete;
  }
}));