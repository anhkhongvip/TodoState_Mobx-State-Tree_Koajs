import React from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useMst } from '../../mst/Root';
import axios from 'axios';
interface TodoItemsProps {}
const TodoItems: React.FC<TodoItemsProps> = observer(() => {
  const { todoList } = useMst();
  const { todoItems } = todoList;
  const router = useRouter();
  const routerEdit = (key: number, val: TodoItem) => {
    router.push({
      pathname: `/todo-list/edit/${val._id}`,
    });
  };
  const removeItem = async (id : string) => {
    try{
      await axios.delete('/api/TodoItem/' + id)
      todoList.removeTodo(id);
    }
    catch(err)
    {
      console.log(err);
    }
  }
  return (
    <>
      {todoItems.length != 0 ? (
        todoItems.map((val, key) => {
          return (
            <Row key={key} className="mt-2">
              <Col xs="2">{key + 1}</Col>
              <Col xs="3">{val.name}</Col>
              <Col xs="3">{val.complete}</Col>
              <Col xs="4">
                <Button variant="warning" onClick={() => routerEdit(key, val)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => removeItem(val._id)}>
                  Remove
                </Button>
              </Col>
            </Row>
          );
        })
      ) : (
        <h4 className="mt-4 ">
          Danh sách trống
        </h4>
      )}
    </>
  );
});

export default TodoItems;
