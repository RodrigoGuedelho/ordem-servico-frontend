//import './style.css';
import React, {useState, Fragment } from "react";
import { Form, Row, Col, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import api from "../../services/api";
import { FiEdit, FiPlus, FiSearch, FiUsers} from 'react-icons/fi';
import ButtonDelete from  "../../components/ButtonDelete";
import { Button } from 'primereact/button';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { AutoComplete } from 'primereact/autocomplete';

function OrdensServico() {
  const [ordensServico, setOrdensServico] = useState([]);
  const [filtroDescricao, setFiltroDescricao] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("ABERTO");
  const [filtroCliente, setFiltroCliente] = useState(null);
  const [clientes, setClientes] = useState([]);
  const listStatus = ["ABERTO", "FINALIZADA", "CANCELADA"];

  async function pesquisar() {
    try {

      if  (filtroDescricao.trim() !== ""  && filtroCliente !== null && filtroCliente !== undefined && filtroCliente.id !== undefined) {
        const response = await api.get("/ordens-servico/filtros/" + filtroStatus + "/" + filtroDescricao + "/" + filtroCliente.id);
        setOrdensServico(response.data);
      } else if  (filtroDescricao.trim() !== ""  && (filtroCliente === null || filtroCliente === undefined || filtroCliente.id === undefined)) {
        const response = await api.get("/ordens-servico/filtros" + filtroStatus + "/"  + filtroDescricao);
        setOrdensServico(response.data);
      } else if  (filtroDescricao.trim() === ""  && (filtroCliente !== null && filtroCliente !== undefined && filtroCliente.id !== undefined)) {
          const response = await api.get("/ordens-servico/filtros/" + filtroStatus + "/cliente-id/"  + filtroCliente.id);
          setOrdensServico(response.data);
          
      }  else  {
        const response = await api.get("/ordens-servico/filtros/" + filtroStatus );
        setOrdensServico(response.data);
       
      } 
    } catch (error) {
      alert("deu pau")
    }
  }

  const  pesquisaClientes = async (event) => {
    if(event.query.toLowerCase() === "")  {
      const response = await api.get("/clientes");
      setClientes(response.data);
    } else  {
      const response = await api.get("/clientes/nome/" + event.query.toLowerCase());
      setClientes(response.data);
    }
    
  }

  const actionBodyTemplate = (ordem) => {
    return (
        <React.Fragment>
            <center>
              <Link className="btn btn-success" to={"/cadastro-ordem-servico/" + ordem.id} style={{marginRight: "5px"}}>
                <FiEdit size={18} color= "#fff" />
              </Link>

              <ButtonDelete  urlRequest="/ordens-servico/" idVariavel={ordem.id} />
            </center>
        </React.Fragment>
    );
}

  return (
    <Fragment>
      <Container>
          <br/>  <br/>
          <center>
            <h1>Pesquisar Ordens de Serviço</h1>
          </center>
          <br/>  <br/>
          <Row md={2}>
            <Col>
              <Link className="p-button p-component"  variant="primary" to="/cadastro-ordem-servico" >
                <FiPlus size={18} color= "#fff" />
              </Link>

              <Link className="p-button p-component btn-margin-left"  variant="primary" to="/clientes" >
                <FiUsers size={18} color= "#fff" />
              </Link>
              
            </Col>    
          </Row>
        <br/> 
        <Row md={2} className="div-margin-botom">
          <Col md={2}>
            <h5>Descrição:</h5>
            <InputText  value={filtroDescricao}   className="ms-5" onChange={(e) => setFiltroDescricao(e.target.value)} />
          </Col>

          <Col md={2}>
            <h5>Cliente:</h5>
            <AutoComplete value={filtroCliente} suggestions={clientes} completeMethod={pesquisaClientes} 
              field="nome" dropdown forceSelection onChange={(e) => setFiltroCliente(e.value)} />
          </Col>

          <Col md={2}>
            <h5>Status:</h5>
            <Dropdown value={filtroStatus} options={listStatus} onChange={(e) => setFiltroStatus(e.target.value)} placeholder="Select a City" />

          </Col>
          
          <Col md={1}>
            <h5>Pesquisar:</h5>
            <Button variant="success" type="button" onClick={pesquisar} style={{marginRight: '5px' }}>
              <FiSearch size={20} color= "#fff" />
            </Button>
          </Col>
         
                  
        </Row> 
        
        <div className="card">
          <DataTable value={ordensServico} paginator variant="ordemServico"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            rows={10} rowsPerPageOptions={[10,20,50]}>
                <Column header="Ações" body={actionBodyTemplate}></Column>
                <Column field="id" header="Id"></Column>
                <Column field="descricao" header="descricao"></Column>
                <Column field="cliente.nome" header="Cliente"></Column>
                <Column field="preco" header="Preço"></Column>
          </DataTable>
        </div>
      </Container>
      
    </Fragment>
  );
}

export default OrdensServico;