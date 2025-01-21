import React from 'react'
import PetLinkLogo from '../../assets/PetLinkLogo.png';
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <img src={PetLinkLogo} alt="Logo da Pet Link" className='logo-pet-link' />
        <div className='opcoes-header'>
            <a href="" className='a-header'>Agendar</a>
            <a href="" className='a-header'>Produtos</a>
            <a href="" className='a-header'>Pedidos</a>
            <button className='butao-header'>Login</button>
        </div>
    </div>
  )
}

export default Header