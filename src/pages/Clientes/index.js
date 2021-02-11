import './style.css';
import React, {useState, useEffect, Fragment } from "react";
import {Table, Button, Form, Row, Col, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import api from "../../services/api";
import { FiEdit, FiPlus, FiSearch} from 'react-icons/fi';
import ButtonDelete from  "../../components/ButtonDelete";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");


  async function pesquisar() {
    try {
      if (filtroNome !== undefined && filtroNome !== "") {
        const response = await api.get("/clientes/nome/" + filtroNome);
        setClientes(response.data);
      } else {
        const response = await api.get("/clientes/");
        setClientes(response.data);
      }
    } catch (error) {
      
    }
  }

  return (
    <Fragment>
      <Container>
          <br/>  <br/>
          <center>
            <h1>Pesquisar Clientes</h1>
          </center>
          <br/>  <br/>
          <Row md={2}>
            <Col>
              <Link className="btn btn-primary"  variant="primary" to="/cadastro-clientes" >
                <FiPlus size={18} color= "#fff" />
              </Link>
              
            </Col>    
          </Row>
        <br/> 
        <Row md={2}>
          <Col md={3}>
            <Form.Group controlId="nome" >
              <Form.Control  type="text"  name="nome" placeholder="Nome " 
                  onChange={e => setFiltroNome(e.target.value)}  />
            </Form.Group>
          </Col>

          <Col md={1}>
            <Button variant="success" type="button" onClick={pesquisar} style={{marginRight: '5px' }}>
              <FiSearch size={18} color= "#fff" />
            </Button>
            
          </Col>
        </Row> 

        <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Ações</th>
                <th>Id</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => 
                <tr>
                  <td>
                    <center> 
                      <Button variant="success" href={"/cadastro-clientes/" + cliente.id} style={{marginRight: "5px"}}>
                        <FiEdit size={18} color= "#fff" />
                      </Button>

                      <ButtonDelete  urlRequest="/clientes/" idVariavel={cliente.id} />
                      
                    </center>
                  </td>
                  <td>{cliente.id}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefone}</td>
                  
                </tr>
              )}       
            </tbody>
          </Table>
      </Container>
      
    </Fragment>
  );
}

export default Clientes;