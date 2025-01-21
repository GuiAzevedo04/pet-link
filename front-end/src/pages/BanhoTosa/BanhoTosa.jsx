import React from 'react'
import TosaImage from  '../../assets/images/Tosa.svg'
import './BanhoTosa.css'
import FormAgendamento from '../../components/FormAgendamento/FormAgendamento'

const BanhoTosa = () => {
  return (
    <div className='banhotosa'>
      <div className='banhotosa-introducao'>
        <h1>Banho e Tosa</h1>
        <p>Escolha o dia e o horário que melhor se encaixam na sua rotina e garanta o cuidado que seu pet merece. Nossa equipe estará pronta para recebê-lo com toda a atenção e carinho, proporcionando uma experiência tranquila e agradável. Deixe seu pet em boas mãos e aproveite a praticidade de agendar online, sem complicações!"</p>
        <img src={TosaImage} alt="" />
      </div>
      <FormAgendamento/>
    </div>
  )
}

export default BanhoTosa