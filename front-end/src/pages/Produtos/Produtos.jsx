import React from 'react'
import ProdutosData from "../../Data/ProdutosData"
import './Produtos.css'

const Produtos = () => {
  return (
    <div className='produtos-page'>
        <div className='produtos-content'>
            <h1>Produtos</h1>
            <div className='produtos-grid'>
            {ProdutosData.map((produto) => (
                <div key={produto.id} className="produto">
                    <a href="">
                    <img src={produto.imageLink} alt="" />
                    <h3>{produto.name}</h3>
                    </a>
                    <p>{produto.description}</p>
                    <p id='preco'>{`R$${produto.price}`}</p>
                </div>
            ))}
            </div>
        </div>
    </div>
  )
}

export default Produtos