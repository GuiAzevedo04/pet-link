import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import './ProdutosDetalhes.css'

const ProdutosDetalhes = () => {
    const {id} = useParams();
    const [produto, setProduto] = useState(null);
    
    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const response = await axios.get(`/api/produto/${id}`,{
                    headers:{
                      "skip_zrok_interstitial"  : "true"
                    }
                });
                setProduto(response.data);
            } catch (err) {
                console.error("Erro ao buscar detalhes do produto: ", err);
            }
        };

        fetchProduto();
    }, [id]);

    const fetchAddProduto = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log("OLHA O ID", id)
        const response = await axios.post(`/api/carrinho/add?productId=${id}&quantity=1`, {}, {
          headers:{
            "skip_zrok_interstitial"  : "true",
            "Authorization": `Bearer ${token}`,
          }
      });
        console.log("Produto adicionado ao carrinho:", response.data)
      } catch (err){
        console.error("Erro ao adicionar produto ao carrinho: ", err)
      }
    }

    if(!produto){
        return <p className='tela-carregamento'>Carregando...</p>
    }

  return (
    <div className="produto-detalhes">
      <img src={produto.imageLink} alt={produto.name} />
      <div className='info-produto-compra'>
        <h1>{produto.name}</h1>
        <p id='preco-produto-detalhes'> R$ {produto.price}</p>
        <p>{produto.description}</p>
        <button onClick={fetchAddProduto}>Adicionar ao carrinho</button>
      </div>
    </div>
  )
}

export default ProdutosDetalhes