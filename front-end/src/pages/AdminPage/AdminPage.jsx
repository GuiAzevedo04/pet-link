import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderAdm from '../../components/HeaderAdm/HeaderAdm';
import './AdminPage.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PopUpAdm from './PopUpAdm';

const AdminPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [modalAberto, setModalAberto] = useState(null); // null, 'adicionar', 'editar', 'deletar'
  const [produtoSelecionado, setProdutoSelecionado] = useState(null); 
  const [novoProduto, setNovoProduto] = useState({
    name: '',
    price: '',
    imageLink: '',
    amount: '',
  });

  const fetchAdmin = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`/api/cliente/profile`, {
        headers: {
          "skip_zrok_interstitial": "true",
          "Authorization": `Bearer ${token}`,
        },
      });
      const userRole = response.data.role;
      setUser(userRole);
    } catch (err) {
      console.error("Erro ao solicitar o nome:", err);
    }
  }; 

    if (user != 'ADMIN' ) {
    return <h1>Você não tem permissão para acessar esta página.</h1>;
  }

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('/api/produto/all', {
          headers: {
            "skip_zrok_interstitial": "true",
          },
        });
        console.log('Conteúdo do GET:', response.data);
        setProdutos(response.data);

        const horariosResponse = await axios.get('/api/agendamentos', {
          headers: {
            "skip_zrok_interstitial": "true",
          },
        });
        console.log('Conteúdo do GET:', horariosResponse.data);
        setHorarios(horariosResponse.data);
      } catch (err) {
        console.error('Erro ao buscar os horários:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
    fetchAdmin();
  }, []);

  const handleChange = (e) => {
    setNovoProduto({ ...novoProduto, [e.target.name]: e.target.value });
  };

  const handleAdicionarProduto = async () => {
    try {
      const response = await axios.post('/api/produto/create', novoProduto, {
        headers: {
          "skip_zrok_interstitial": "true",
        },
      });
      setProdutos([...produtos, response.data]);
      setNovoProduto({ name: '', price: '', imageLink: '' });
      handleFecharModal();
    } catch (err) {
      console.error('Erro ao adicionar o produto:', err);
    }
  };


  const handleEditarProduto = async (produto) => {
    try{
      const produtoSanitizado = {
        name: produto.name,
        price: produto.price,
        imageLink: produto.imageLink,
      };

      const response = await axios.put(`/api/produto/${produto.id}`,produtoSanitizado,{
        headers: {
          "skip_zrok_interstitial": "true",
        },
      });

      setProdutos((prevProdutos) =>
        prevProdutos.map((p) =>
          p.id === produto.id ? { ...p, ...produtoSanitizado } : p
        )
      );

      handleFecharModal();
    } catch (err) {
      console.error('Erro ao editar o produto:', err)
    }
  };

  const handleDeletarProduto = async (id) => {
    try{
      const response = await axios.delete(`/api/produto/${id}`,{
        headers: {
          "skip_zrok_interstitial": "true",
        },
      });

      setProdutos((prevProdutos) =>
        prevProdutos.filter((produto) => produto.id !== id)
      );

      handleFecharModal();
    } catch (err) {
      console.error('Erro ao excluir o produto: ', err)
    }
  };

  const handleAbrirModal = (tipo, produto = null) => {
    setModalAberto(tipo);
    setProdutoSelecionado(produto);
  };
  const handleFecharModal = () => {
    setModalAberto(null);
    setProdutoSelecionado(null);
  };


  if (loading) {
    return <p className='tela-carregamento'>Carregando...</p>;
  }

  return (
    <div className='adm-page'>
      <div className='adm-page-content'>
        <h1>Admin</h1>
        <div className='cabecalho-produtos-adm'>
          <h2>Produtos:</h2>
          <button onClick={() => handleAbrirModal('adicionar')}>Adicionar Produto</button>
        </div>
        <div className='produtos-grid-adm'>
          {produtos.map((produto) => (
            <div className='produto-adm' key={produto.id}>
              <img src={produto.imageLink} alt="" />
              <div className='content-produto-adm'>
                <div className='nomePreco-produto-adm'>
                  <p>{produto.name}</p>
                  <p>{`R$${produto.price}`}</p>
                </div>
                <div className='opcoes-produto-adm'>
                  <a href="#" onClick={() => handleAbrirModal('editar', produto)}><EditIcon /></a>
                  <a href="#" onClick={() => handleAbrirModal('deletar', produto)}><DeleteIcon /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='agenda-adm'>
          <div className='agenda-adm-titulo'><h2>Agenda</h2></div>
          <div className='marcacoes'>
            {horarios.map((horario, index) => (
              <div key={index} className='horario'>
                <div className='datahorario'>
                  <p>{horario.scheduleDate}</p>
                  <p>{horario.timeOfSchedule}</p>
                </div>
                <p>{horario.serviceName}</p>
                <div >
                  <p>{horario.petName}</p>
                  <div className='edit-delete-agenda'>
                    <a href="#" onClick={() => handleAbrirModal('editar', produto)}><EditIcon /></a>
                    <a href="#" onClick={() => handleAbrirModal('deletar', produto)}><DeleteIcon /></a>
                  </div>
    
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PopUpAdm
        modalAberto={modalAberto}
        produtoSelecionado={produtoSelecionado}
        handleFecharModal={handleFecharModal}
        novoProduto={novoProduto}
        handleChange={handleChange}
        handleAdicionarProduto={handleAdicionarProduto}
        handleEditarProduto={handleEditarProduto}
        handleDeletarProduto={handleDeletarProduto}
      />

    </div>
  );
};

export default AdminPage;
