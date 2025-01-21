import React from 'react' 
import LogoFacebook from '../../assets/LogoFacebook.svg';
import LogoLinkedin from '../../assets/LinkedinLogo.svg';
import LogoYoutube from '../../assets/YoutubeLogo.svg';
import LogoInstagram from '../../assets/InstagramLogo.svg';
import './Footer.css'

const Footer = () => {
  return (
    <div className='Footer'>
        <div className='infos-footer'>
            <h2 className='petlink-footer'>PetLink</h2>
            <div className='grid-redes'>
                <img src={LogoFacebook} alt="" />
                <img src={LogoLinkedin} alt="" />
                <img src={LogoYoutube} alt="" />
                <img src={LogoInstagram} alt="" />
            </div>
        </div>
        <h1 className='lema-footer'>Praticidade e cuidado na medida certa!</h1>
    </div>
  )
}

export default Footer