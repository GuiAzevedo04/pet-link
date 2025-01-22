import React, { useEffect, useState } from 'react'
import PetLinkLogo from '../../assets/PetLinkLogo.png';
import './Header.css'
import { Modal, Box, TextField, Button } from '@mui/material';
import axios from 'axios';

const Header = () => {

  const [isLogged, setIsLogged] = useState(false);
  const [name, setName] = useState(null);
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true); 
  const handleClose = () => setOpen(false);

  const fetchUserName = async (token) => {
    try{
      const response = await axios.get(`/api/cliente/profile`, {
        headers: {
          "skip_zrok_interstitial": "true",
          "Authorization": `Bearer ${token}`,
        },
      });
      setName(response.data.name);
      setIsLogged(true);
    } catch (err){
      console.error("Erro ao solicitar o nome:",err)
    }
  }

  const fetchLogin = async () => {
    try {
      const response = await axios.post('/api/cliente/login', formData, {
        headers: {
          "skip_zrok_interstitial": "true",
        },
      });
      console.log("OH A RESPONSE", response.data)
      localStorage.setItem('authToken', response.data.token);
      fetchUserName(response.data.token);
      handleClose();
    } catch(err){
      console.error("Erro ao fazer o logi:", err)
    }
  }

  useEffect(() => {
    const token = getToken();
    if(token){
      fetchUserName(token);
    }
  }, []);

  const getToken = () => {
    return localStorage.getItem('authToken');
  }

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData => ({
      ...prevData,
      [name]: value,
    })))
  }

  return (
    <>
    <div className='header'>
      <a href="/"><img src={PetLinkLogo} alt="Logo da Pet Link" className='logo-pet-link' /></a>
        <div className='opcoes-header'>
            <a href="/banho-tosa" className='a-header'>Agendar</a>
            <a href="/produtos" className='a-header'>Produtos</a>
            <a href="/carrinho" className='a-header'>Carrinho</a>
            {isLogged ?(
              <button className='butao-header' onClick={() => handleOpen()}>{name}</button>
            ) : (
              <button className='butao-header' onClick={() => handleOpen()}>Login</button>
            )}
        </div>
    </div>

    <Modal open={open} onClose={handleClose}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#D2FD46',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              margin="normal"
              onChange={handleChange}
              sx={{ bgcolor: 'white' }}
            />
            <TextField
              fullWidth
              label="Senha"
              name="password"
              margin="normal"
              type='password'
              onChange={handleChange}
              sx={{ bgcolor: 'white' }}
            />
            <a href="">Cadastre-se</a>
            <Button
              color="error" 
              sx={{
                bgcolor: "black",
                color: "white",
                width: "100%",
                marginTop: "2%"
              }}
              onClick={() => fetchLogin()}
            >Login</Button>
          </Box>
        </Modal>
    </>
  )
}

export default Header