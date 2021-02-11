import React from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"


import CadCliente from "./pages/CadCliente";
import Clientes from "./pages/Clientes"

export default function Routes(props) {
  return (

    <BrowserRouter>
      <Switch>
        <Route path="/clientes" component={Clientes} />
       
        <Route path="/cadastro-clientes/:id" component={CadCliente} exact/>   
        <Route path="/cadastro-clientes" component={CadCliente} exact />    
      </Switch>
    </BrowserRouter>
  )
}
