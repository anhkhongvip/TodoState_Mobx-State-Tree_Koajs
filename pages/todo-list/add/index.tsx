import React, {FC, useState, ChangeEvent, MouseEvent} from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useMst } from "../../../mst/Root";
import { useRouter } from 'next/router'
import { observer } from 'mobx-react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
interface addTodoProps { 

}
const addTodo : FC<addTodoProps> = () => {
  const router = useRouter();
  const [name, setName] = useState<string>();
  const [complete, setComplete] = useState<string>('False');
  const { todoList } = useMst();
  const handlerChange = (e : ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
  }
  const addNewTodo = async (e : MouseEvent<HTMLButtonElement>) => {
      try{
        e.preventDefault();
        const todo = { _id : uuidv4(), name, complete }
        const response = await axios.post("/api/TodoItem", todo);
        console.log(response.data);
        todoList.addTodoItem(todo);
        router.back();
      }
      catch(error) {
        console.log(error);
        if(error.response.data)
        {
          console.log(error.response.data);
        }
      }
    }
  return (
    <div>
      <Container>
        <h1 className="text-center mt-5">ADD TODO</h1>
        <Row className="justify-content-md-center mt-5">
          <Col xs="6">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name : </Form.Label>
                <Form.Control type="text" placeholder="Enter name" onChange = {handlerChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formComplete">
                {' '}
                <Form.Label>Complete : </Form.Label><br/>
                <input
                  type="radio"
                  name="check-complete"
                  defaultValue="True"
                  onClick = {() => {setComplete("True")}}
                />
                <label className="ms-2" htmlFor="true">
                  True
                </label>
                <input
                  className="ms-3"
                  type="radio"
                  name="check-complete"
                  defaultValue="False"
                  onClick = {() => {setComplete("False")}}
                  defaultChecked
                />
                <label className="ms-2" htmlFor="false">
                  False
                </label>
                <br />
              </Form.Group>
              <Button variant="primary" type="submit" onClick = {addNewTodo}>Thêm mới</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default observer(addTodo);
