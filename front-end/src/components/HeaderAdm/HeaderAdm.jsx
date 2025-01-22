import React from 'react'
import PetLinkLogo from '../../assets/PetLinkLogo.png';
import './HeaderAdm.css'

const HeaderAdm = () => {
  return (
    <div className='header-adm'>
      <a href="/"><img src={PetLinkLogo} alt="Logo da Pet Link" className='logo-pet-link' /></a>
        <div className='opcoes-header-adm'>
            <button className='butao-header-adm'>Login</button>
        </div>
    </div>
  )
}

export default HeaderAdm