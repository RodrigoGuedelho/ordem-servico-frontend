import './style.css';
import React, {useState, useEffect, Fragment } from "react";
import { Form, Row, Col, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import api from "../../services/api";
import { FiEdit, FiPlus, FiSearch} from 'react-icons/fi';
import ButtonDelete from  "../../components/ButtonDelete";
import { Button } from 'primereact/button';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

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

  const actionBodyTemplate = (cliente) => {
    return (
        <React.Fragment>
            <center>
              <Link className="btn btn-success" to={"/cadastro-clientes/" + cliente.id} style={{marginRight: "5px"}}>
                <FiEdit size={18} color= "#fff" />
              </Link>

              <ButtonDelete  urlRequest="/clientes/" idVariavel={cliente.id} />
            </center>
        </React.Fragment>
    );
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
              <Link className="p-button p-component"  variant="primary" to="/cadastro-clientes" >
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
        
        <div className="card">
                <DataTable value={clientes} paginator variant="cliente"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                rows={10} rowsPerPageOptions={[10,20,50]}>
                    <Column header="Ações"  body={actionBodyTemplate}></Column>
                    <Column field="id" header="Id"></Column>
                    <Column field="nome" header="Nome"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="telefone" header="Telefone"></Column>
                   
                </DataTable>
            </div>
      </Container>
      
    </Fragment>
  );
}

export default Clientes;