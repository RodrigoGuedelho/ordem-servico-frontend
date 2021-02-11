//import './App.css';
import React, {useState, Fragment } from "react";
import {Modal, Button, Form} from 'react-bootstrap';
import api from "../../services/api";
import { FiTrash } from "react-icons/fi";

const ButtonDelete = props => {

  const [show, setShow] = useState(false);
  const {urlRequest, idVariavel} = props;


  function handleShow(e)  {
    setShow(true);
  }
  
   function  handleClose (e)  {
     setShow(false);
   }
  async function handleOnSubmit(e) {
    //e.preventDefault(e);
    try {
      const response = await api.delete(urlRequest + idVariavel);
      setShow(false);
    } catch (error) {
      console.log('erro ao tenta cancelar. ' + error)
     }
  }

  return (
    <Fragment>
        <Button variant="danger" onClick={handleShow}>
          <FiTrash size={18} color="#fff" />
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Aviso</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tem certeza que deseja excluir?</Modal.Body>
          <Modal.Footer>
            <Form  onSubmit={handleOnSubmit}>
            <input name="id" type="hidden" value={idVariavel} />
              <Button variant="danger" type="submit">
                Sim
              </Button>
            </Form>
            
            <Button variant="secondary" onClick={handleClose}>
              Não
            </Button>
          </Modal.Footer>
        </Modal>
    </Fragment>
  );
}

export default ButtonDelete;