import React, {Fragment, useState, useEffect, useRef} from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import api from "../../services/api"
import './style.css';
const DialogCadComentario = props => {
  
  const {nome, visivel, setVisivel, ordemId} = props;

  const [comentario, setComentario] = useState("");
  
  const toast = useRef(null);



  function showMenssage(mensagem, tipoMensagem) { 
    toast.current.show({severity: tipoMensagem, summary: mensagem, detail:'', life: 3000});
  }

  const onClick = () => {
    setVisivel(true);
  }

  const onHide = () => {
    setVisivel(false);
  }


  const salvar = async () => {
    try {
      const response = await api.post("ordens-servico/" + ordemId + "/comentario/", 
        {
          descricao: comentario
        })
      setComentario("");
      showMenssage("Operação realizada com sucesso.", "success")
      onHide();
    } catch (error) {
      showMenssage("Erro ao tenta cadastrar um comentario.", "error")
    }

  }
  const renderFooter = () => {
    return (
        <div>
            <Button label="Sair" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
            <Button label="Salvar" icon="pi pi-check" onClick={() => salvar()} autoFocus />
        </div>
    );
  }
  return (
    <Fragment>
        <Toast ref={toast} />
        <Dialog header="Cadastrar Comentario" modal={false} visible={visivel} style={{ width: '50vw' }} footer={renderFooter()} onHide={() => onHide()}>   
          <h5>Mensagem:</h5>
          <InputTextarea rows={5} cols={60} value={comentario} onChange={(e)  =>  setComentario(e.target.value)}/>
        </Dialog>
    </Fragment>
  );
}

export default DialogCadComentario;