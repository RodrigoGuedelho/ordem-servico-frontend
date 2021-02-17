import React, {Fragment, useState, useEffect} from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import {Column} from "primereact/column"
import api from "../../services/api"
import './style.css';

const DialogComentarios = props => {
  
  const { visivel, setVisivel, comentarios, ordemId} = props;

  const onClick = () => {
    setVisivel(true);
  }

  const onHide = () => {
    setVisivel(false);
  }

  const renderFooter = () => {
    return (
        <div>
            <Button label="Sair" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
        </div>
    );
  }
  return (
    <Fragment>
      
        <Dialog header={"Comentarios da Ordem n° " + ordemId} modal={false} visible={visivel} style={{ width: '50vw' }} footer={renderFooter()} onHide={() => onHide()}>   
          <DataTable value={comentarios} paginator variant="ordemServico"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            rows={5} >
                <Column field="dataEnvio" header="Data  do envio"></Column>
                <Column field="descricao" header="Descrição"></Column>
          </DataTable>
        </Dialog>
    </Fragment>
  );
}

export default DialogComentarios;