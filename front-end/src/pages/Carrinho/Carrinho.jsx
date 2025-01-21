import React from 'react'
import ProdutosData from "../../Data/ProdutosData"
import "./Carrinho.css"

const Carrinho = () => {
  return (
    <div className='carrinho-page'>
        <h1>Carrinho</h1>
        <div className='grid-carrinho'>
        {ProdutosData.map((produto) => (
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
            <p id='soma-total'>SOMA TOTAL</p>
        </div>
        <button>Comprar</button>

    </div>
  )
}

export default Carrinho