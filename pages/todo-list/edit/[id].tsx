import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Form, Col, Button } from 'react-bootstrap';
import { useMst } from '../../../mst/Root';
import axios from 'axios';
const EditTodo: React.FC = () => {
  const router = useRouter();
  const { todoList } = useMst();
  const { todoItems } = todoList;
  let id = router.query.id;
  const index = todoItems.findIndex(item => item._id === id);
  const [nameEdit, setNameEdit] = useState<string>(todoItems[index].name);
  const [completeEdit, setCompleteEdit] = useState<string>(todoItems[index].complete);
  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameEdit(e.target.value);
  }; 
  const handlerClickOption = (e : ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setCompleteEdit(e.target.value);
  }
  const sendEditData = async (e : MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    try{
      const todoUpdate = {name : nameEdit, complete : completeEdit}
      let res = await axios.put("/api/TodoItem/"+id, todoUpdate);
      console.log(res.data);
      todoItems[index].editTodoItem(nameEdit, completeEdit);
      router.back();
    }
    catch(error)
    {
      console.log(error);
      if(error.response.data)
        {
          console.log(error.response.data);
        }
    }
  } 
  return (
    <>
      <Container>
        <h1 className="text-center mt-5">Edit State</h1>
        <Row className="justify-content-md-center mt-5">
          <Col xs="6">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name : </Form.Label>
                <Form.Control
                  type="text"
                  value={nameEdit}
                  placeholder="Enter name"
                  onChange={handlerChange}
                />
              </Form.Group>
              <Form.Label>Complete : </Form.Label>
              <Form.Select defaultValue={completeEdit} onChange={handlerClickOption}>
                   <option value="True">True</option> 
                   <option value="False">False</option>
              </Form.Select>
              <Button variant="primary" className="mt-3" onClick = {sendEditData}>Sửa thông tin</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditTodo;