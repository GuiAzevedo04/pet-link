import React, { useEffect, useState } from 'react'
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import axios from 'axios';
import './Registro.css'
import Logo from '../../assets/PetLinkLogo.png'
import CachorroRegistro from '../../assets/images/Registro.png'


const Registro = () => {
    const[usuario,setUsuario] = useState({
        name: '',
        email: "",
        phone: "",
        adress: "",
        password: "",
        cpf: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
    const fetchUser = async () => {
        try {
            const response = await axios.post('/api/cliente/register', usuario, {
                headers: {
                  "skip_zrok_interstitial": "true",
                },
              });
            console.log("Usuario cadastrado:", response)
        } catch (err) {
            console.error("Falha ao registrar usuario", err)
        }
    }

  return (
    <div className='registro'>
            <div className='form-registro'>
                <img src={Logo} alt="Logo PetLink" className='logo-registro' />
              <TextField
                fullWidth
                label="Nome"
                name="name"
                margin="normal"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="CPF"
                name="cpf"
                margin="normal"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Senha"
                name="password"
                margin="normal"
                type="password"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Confirmar Senha"
                name="password-confirm"
                margin="normal"
                type="password"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                margin="normal"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Telefone"
                name="phone"
                margin="normal"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Endereço"
                name="adress"
                margin="normal"
                onChange={handleChange}
              />
              <Button
                startIcon={<HowToRegIcon />}
                onClick={fetchUser}
                sx={{
                  bgcolor: "black",
                  color: "white",
                  width: "100%",
                  marginTop: "2%",
                }}
              >
                Registrar
              </Button>
            </div>
            <img src={CachorroRegistro} alt="Cachorro fazendco compras" className='cachorro-registro' />
    </div>
  )
}

export default Registro