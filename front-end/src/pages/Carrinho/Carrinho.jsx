import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Carrinho.css"
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal, Box, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Carrinho = () => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [horario, setHorarios] = useState({
        scheduleDate: '',
        timeOfSchedule: '',
        serviceName: '',
        petName: '',
    });
    const [modalAberto, setModalAberto] = useState(false); 

    const handleAbrirModal = () => {
        setModalAberto(true);
      };

    const handleFecharModal = () => {
        setModalAberto(false);
    };

    useEffect(() => {
        const fetchProdutos = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get('/api/carrinho', {
            headers: {
                "skip_zrok_interstitial": "true",
                "Authorization": `Bearer ${token}`,
            },
            });
            console.log('Conteúdo do GET:', response.data.items);
            setProdutos(response.data.items);
        } catch (err) {
            console.error('Erro ao buscar os produtos:', err);
        } finally {
            setLoading(false);
        }};

        const fetchHorario = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('/api/agendamentos/cliente', {
                    headers: {
                        "skip_zrok_interstitial": "true",
                        "Authorization": `Bearer ${token}`,
                    },
                    });
                setHorarios(response.data);
            }catch (err) {
                console.error('Erro ao buscas os horários:', err);
            }
        }

        fetchHorario();
        fetchProdutos();
    }, []);

    const deleteItem = async (id) => {
        try{
            const token = localStorage.getItem('authToken');
            const response = await axios.delete(`/api/carrinho?productId=${id}`, {
            headers: {
                "skip_zrok_interstitial": "true",
                "Authorization": `Bearer ${token}`,
            },
            });
            console.log("Produto excluido do carrinho: ", response )
            setProdutos((prevProdutos) =>
                prevProdutos.filter((produto) => produto.product.id !== id)
              );
        } catch (err){
            console.error("Erro ao excluir produto do carrinho:", err)
        }
    }

    const handleDeletarHorario = async (id) => {
        try{
          console.log("id do horario", id)
          const response = await axios.delete(`/api/agendamentos/${id}`,{
            headers: {
              "skip_zrok_interstitial": "true",
            },
          });
          setHorarios({
            scheduleDate: '',
            timeOfSchedule: '',
            serviceName: '',
            petName: '',
          })
          handleFecharModal();
        } catch (err) {
          console.error("Erro ao excluir o horário: ", err)
        }
      }

    const valorTotal = produtos.reduce((acc, produto) => acc + produto.product.price, 0);

    if (loading) {
        return <p className='tela-carregamento'>Carregando...</p>
      }
      
  return (
    <div className='carrinho-page'>
        <h1>Carrinho</h1>
        <div className='grid-carrinho'>
        {produtos.map((produto, index) => (
                <div className="produto-carrinho" key={index}>
                    <img src={produto.product.imageLink} alt={produto.product.name} />
                    <div className='info-produto-carrinho'>
                        <h3 id='produto-nome-carrinho'>{produto.product.name}</h3>
                        <div className='mateus-mendes'>
                            <p>{`R$${produto.product.price}`}</p>
                            <a href="#" onClick={() => deleteItem(produto.product.id)}><DeleteIcon/></a>
                        </div>      
                    </div>
                </div>
            ))}
        </div>
        <div className='div-soma-total'>
            <p id='soma-total'>R${valorTotal.toFixed(2)}</p>
        </div>
        <button>Comprar</button>

        <div className='agenda-adm'>
          <div className='agenda-adm-titulo'><h2>Seu Último Agendamento</h2></div>
          <div className='marcacoes'>
              <div className='horario'>
                <div className='datahorario'>
                    <p>Quando?</p>
                  <p>{horario.scheduleDate}</p>
                  <p>{horario.timeOfSchedule}</p>
                </div>
                <p>{horario.serviceName}</p>
                <div >
                    <p>Nome do pet:</p>
                  <p>{horario.petName}</p>
                  <div className='edit-delete-agenda'>
                    <a href="#" onClick={() => handleAbrirModal()}><DeleteIcon /></a>
                  </div>
                </div>
              </div>
          </div>
        </div>


        {modalAberto && horario && (
        <Modal open={true} onClose={handleFecharModal}>
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#f8d7da',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
        }}>
            <h2>Deletar Agendamento</h2>
            <p>Tem certeza que deseja deletar o agendamento</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
            <Button onClick={handleFecharModal} style={{ marginRight: 8 }} sx={{ bgcolor: 'gray', color: 'white' }}>Cancelar</Button>
            <Button variant="contained" color="error" onClick={() => handleDeletarHorario(horario.idSchedules)}>Deletar</Button>
            </div>
        </Box>
        </Modal>
    )}
    </div>

    

  )
}

export default Carrinho