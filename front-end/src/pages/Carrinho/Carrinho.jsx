import React, { useState, useEffect } from 'react';
import ProdutosData from "../../Data/ProdutosData"
import axios from 'axios';
import "./Carrinho.css"

const Carrinho = () => {
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
        }};

        fetchProdutos();
    }, []);

    const valorTotal = produtos.reduce((acc, produto) => acc + produto.price, 0);

    if (loading) {
        return <p className='tela-carregamento'>Carregando...</p>
      }
      
  return (
    <div className='carrinho-page'>
        <h1>Carrinho</h1>
        <div className='grid-carrinho'>
        {produtos.map((produto) => (
                <div className="produto-carrinho" key={produto.id}>
                    <img src={produto.imageLink} alt={produto.name} />
                    <div className='info-produto-carrinho'>
                        <h3 id='produto-nome-carrinho'>{produto.name}</h3>
                        <p>{`R$${produto.price}`}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className='div-soma-total'>
            <p id='soma-total'>R${valorTotal.toFixed(2)}</p>
        </div>
        <button>Comprar</button>

    </div>
  )
}

export default Carrinho