import React from 'react'
import ImagemBanho from '../../assets/images/Banho.png'
import './MainPage.css'
import BanhoTosa from '../../assets/images/BanhoTosa.png'
import Produtos from '../../assets/images/Produtos.png'

const MainPage = () => {
  return (
    <div className='mainpage'>
        <div className='bemvindo-mainpage'>
            <h1 className='titulo-mainpage'>Bem-vindo à PetLink - O Futuro do Atendimento para Seu Pet!</h1>
            <p>Na PetLink, somos especialistas em banho e tosa, dedicados a cuidar do seu pet com o carinho e profissionalismo que ele merece. Sabemos que a higiene e o bem-estar dos nossos amigos de quatro patas são essenciais para a saúde e felicidade deles. É por isso que nos dedicamos exclusivamente a oferecer os melhores serviços de banho e tosa da região.</p>
            <img src={ImagemBanho} alt="" />
        </div>
        <div className='servicos-mainpage'>
            <h2>Oferecemos serviços como:</h2>
            <div className='grid-servicos'>
                <div className='servico-card'>
                    <img src={BanhoTosa} alt="" />
                    <h3>Banho e tosa</h3>
                    <p>Na PetLink, nossos serviços de banho e tosa são realizados com todo o cuidado que seu pet merece.</p>
                </div>
                <div className='servico-card'>
                    <img src={Produtos} alt="" />
                    <h3>Venda de Produtos para pets</h3>
                    <p>Oferecemos uma seleção cuidadosamente escolhida de produtos para o cuidado, conforto e diversão do seu pet.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MainPage