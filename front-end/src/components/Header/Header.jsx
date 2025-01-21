import React from 'react'
import PetLinkLogo from '../../assets/PetLinkLogo.png';
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <a href="/"><img src={PetLinkLogo} alt="Logo da Pet Link" className='logo-pet-link' /></a>
        <div className='opcoes-header'>
            <a href="/banho-tosa" className='a-header'>Agendar</a>
            <a href="/produtos" className='a-header'>Produtos</a>
            <a href="/carrinho" className='a-header'>Carrinho</a>
            <button className='butao-header'>Login</button>
        </div>
    </div>
  )
}

export default Header