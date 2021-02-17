import React from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"


import CadCliente from "./pages/CadCliente";
import Clientes from "./pages/Clientes"
import CadOrdemServico from "./pages/CadOrdemServico";
import  OrdensServico from "./pages/OrdensServico"

export default function Routes(props) {
  return (

    <BrowserRouter>
      <Switch>
        <Route path="/" component={OrdensServico} exact/>
        <Route path="/clientes" component={Clientes} />
       
        <Route path="/cadastro-clientes/:id" component={CadCliente} exact/>   
        <Route path="/cadastro-clientes" component={CadCliente} exact />   

        <Route path="/cadastro-ordem-servico/:id" component={CadOrdemServico} exact /> 
        <Route path="/cadastro-ordem-servico" component={CadOrdemServico} exact />    
            
      </Switch>
    </BrowserRouter>
  )
}
