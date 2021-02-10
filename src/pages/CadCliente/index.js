import React, {useState, useEffect, Fragment } from 'react';
import { Container, Button, Form, Col, Row, Alert } from 'react-bootstrap';
import api from "../../services/api"

function CadCliente() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [variantAlert, setVariantAlert] = useState('');
  const [messageAlert, setMessageAlert] = useState('');


  async function salvar() {
    var response = '';
    try {

      response = await api.post("/clientes",
      {
        nome: nome,
        email: email,
        telefone: telefone,
      }
      );
      console.log(response);

      if (response.status === 200 || response.status === 201) {
        setMessageAlert("Cliente cadastrado com sucesso.");
        setVariantAlert("success");
      } else {
        setMessageAlert("Erro ao tenta salvar o cliente.");
        setVariantAlert("error");
      }
      
      setShowAlert(true);
      limparCampos();
      
    } catch (error) {
      setMessageAlert("Erro  ao salvar um cliente.");
      setVariantAlert("danger");
      setShowAlert(true)
    }
  }

  function limparCampos() {
    setNome("");
    setEmail("");
    setTelefone("");
  }

  async function handleOnSubmit (e) {
    e.preventDefault();
    salvar();  
   
  } 

  return (
    <Fragment>
      <br />
      <Container>
      <center><h1>Cadastro de Cliente:</h1></center>
      
      <Alert variant={variantAlert} show={showAlert}>
            {messageAlert}
          </Alert>
      <Form onSubmit={handleOnSubmit}>
        <Row md={2}>
            <Col>
              <Form.Group controlId="nome" >
                <Form.Label>Nome:</Form.Label>
          
                <Form.Control type="text" placeholder="Nome" value={nome}
                    onChange={e => setNome(e.target.value)} required={true} 
                      minLength={8} maxLength={80} />         
              </Form.Group>
            </Col>
        </Row>

        <Row md={2}>
            <Col>
              <Form.Group controlId="email" >
                <Form.Label>Email:</Form.Label>
                <Form.Control type="text" placeholder="Email" value={email}
                    onChange={e => setEmail(e.target.value)} required={true} 
                      minLength={8} maxLength={80} />     
              </Form.Group>
            </Col>
        </Row>

        <Row md={2}>
          <Col>
            <Form.Group controlId="telefone" >
              <Form.Label>Telefone:</Form.Label>
        
              <Form.Control type="text" placeholder="Telefone" value={telefone}
                  onChange={e => setTelefone(e.target.value)} required={true} 
                    minLength={8} maxLength={80} />
            </Form.Group>
          </Col>
        </Row>

        <Row md={2} >
          <Col>
            <Button variant="success" type="submit" style={{marginRight: '5px' }}>Salvar</Button>
            
          </Col>
        </Row>
        
      </Form>
      </Container>
    </Fragment>
  )
}

export default CadCliente;