import React, {useState, useEffect, useRef, Fragment } from 'react';

import { Container,  Col, Row , Form} from 'react-bootstrap';
import {useParams, Link} from 'react-router-dom';
import api from "../../services/api"

import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const  CadOrdemServico = props => {
  const [descricao, setDescricao] = useState('');
  const [cliente, setCliente] = useState({id: 0, nome:  ""});
  const [clientes, setClientes] = useState([]);
  const [preco, setPreco] = useState(0.00);

  const [idOrdem, setIdOrdem] = useState(0);
  const {match} = props;
  const {id} = match.params;

  const toast = useRef(null);
  
  
   useEffect(async () => {
    console.log(id)
    if(id !== undefined){
      const response = await api.get("ordens-servico/" + id) 
      const ordemServico  = response.data
        setDescricao(ordemServico.descricao);
        setCliente(ordemServico.cliente);
        setPreco(ordemServico.preco);
       
    }
   
   
  }, [])
    

  function showMenssage(mensagem, tipoMensagem) { 
    toast.current.show({severity: tipoMensagem, summary: mensagem, detail:'Message Content', life: 3000});
  }

  function exibirMensagem(status) {
    if (status === 200 || status === 201) {
      showMenssage("Operação realizada com sucesso.", "success");
    } else {
      showMenssage("Erro ao tenta salvar ou editar o cliente.", "error");
    }
  }
  

  async function salvar() {
    var response = '';
    try {

      response = await api.post("/ordens-servico/",
        {
          descricao: descricao,
          cliente: {id:  cliente.id},
          preco: preco,
        }
      );

      exibirMensagem(response.status);
      
      limparCampos();
      
    } catch (error) {
     showMenssage("Erro ao cadastrar cliente.", "error");
    }
  }

  async function editar() {
    var response = '';
    try {

      response = await api.put("/ordens-servico/" + id,
        {
          descricao: descricao,
          cliente: {id:  cliente.id},
          preco: preco,
        }
      );

      exibirMensagem(response.status);
      
    } catch (error) {
      showMenssage("Erro ao editar cliente.", "error");
    }
  }

  function limparCampos() {
    setDescricao("");
    setCliente({nome: ""});
    setPreco(0.00);
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

  async function handleOnSubmit (e) {
    e.preventDefault();
    if (id !== undefined) {
      editar();
    } else {
      salvar();  
    } 
  } 

  return (
    <Fragment>
      <Container>
        <Toast ref={toast} />
        <Panel header="Ordem de serviço">
          <Form onSubmit={handleOnSubmit}>
            <Row md={5}>
              <Col md={2}>
                <h5>Descrição:</h5>
                <InputText value={descricao}   className="ms-5" onChange={(e) => setDescricao(e.target.value)} />
              </Col>
              
            </Row>

            <Row>
            <Col md={2}>
                <h5>Cliente:</h5>
                <AutoComplete value={cliente} suggestions={clientes} completeMethod={pesquisaClientes} 
                  field="nome" dropdown forceSelection onChange={(e) => setCliente(e.value)} />
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 >Preço:</h5>
                <InputNumber id="locale-user" value={preco} onValueChange={(e) => setPreco(e.value)} mode="decimal" minFractionDigits={2} />
              </Col>
            </Row>
            <br/>
            <Button  className="p-button-success" type="submit" >Salvar</Button>
            <Link className="p-button p-component  p-button-primary  btn-margin-left" to="/" >Voltar</Link>
          </Form>      
        </Panel>   
      </Container>
      
    </Fragment>
  )
}

export default CadOrdemServico;