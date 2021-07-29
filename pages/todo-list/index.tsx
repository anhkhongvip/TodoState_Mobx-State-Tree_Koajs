import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useMst } from '../../mst/Root';
import { useRouter } from 'next/router';
import TodoItems from '../../src/components/todoItems';

let renderTimes = 0;
const TodoList: React.FC = observer(() => {
  const router = useRouter();
  const { todoList } = useMst();
  useEffect(() => {
    if(renderTimes === 0)
    {
       todoList.getTodoItem();
       renderTimes = 1;
    }
  }, [])
  return (
    <>
      <Container>
        <h1 className="text-center mt-5">{todoList.name}</h1>
        <Button variant="primary" onClick={() => router.push('todo-list/add')}>
          Thêm mới
        </Button>
        <h3 className="mt-5">List todo : </h3>
        <Row className="justify-content-center">
          <Col xs="7">
            <Row>
              {' '}
              <Col xs="2">STT</Col>
              <Col xs="3">Name</Col>
              <Col xs="3">Complete</Col>
              <Col xs="4">Status</Col>
            </Row>
              <TodoItems/>
          </Col>
        </Row>
      </Container>
    </>
  );
});

export default TodoList;