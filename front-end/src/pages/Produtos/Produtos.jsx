import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Produtos.css';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } catch (err) {
        console.error('Erro ao buscar os produtos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  if (loading) {
    return <p className='tela-carregamento'>Carregando...</p>
  }

  return (
    <div className="produtos-page">
      <div className="produtos-content">
        <h1>Produtos</h1>
        <div className="produtos-grid">
          {produtos.map((produto) => (
            <Link to={`/produtos/${produto.id}`} className="produto-a" key={produto.id}>
              <div className="produto">
                <img src={produto.imageLink} alt="" />
                <h3>{produto.name}</h3>
                <p>{produto.description}</p>
                <p id="preco">{`R$${produto.price}`}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Produtos;
