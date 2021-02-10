import React from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"


import CadCliente from "./pages/CadCliente";
import Clientes from "./pages/Clientes"

export default function Routes() {
  return (

    <BrowserRouter>
      <Switch>
        <Route path="/clientes" component={Clientes} />
        <Route path="/cadastro-clientes" component={CadCliente} />    
      </Switch>
    </BrowserRouter>
  )
}
