import React, { useState, useEffect } from 'react';
import ProdutosData from "../../Data/ProdutosData"
import axios from 'axios';
import "./Carrinho.css"
import DeleteIcon from '@mui/icons-material/Delete';

const Carrinho = () => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

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

    </div>
  )
}

export default Carrinho