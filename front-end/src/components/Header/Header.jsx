import React, { useEffect, useState } from 'react';
import PetLinkLogo from '../../assets/PetLinkLogo.png';
import './Header.css';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState({
    name: "",
    email: "",
    phone: "",
    adress: "",
  });
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setIsEditing(false);
    setOpen(false);
  };

  const fetchUserName = async (token) => {
    try {
      const response = await axios.get(`/api/cliente/profile`, {
        headers: {
          "skip_zrok_interstitial": "true",
          "Authorization": `Bearer ${token}`,
        },
      });
      setName({
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        adress: response.data.adress,
      });
      setIsLogged(true);
    } catch (err) {
      console.error("Erro ao solicitar o nome:", err);
    }
  };

  const fetchLogin = async () => {
    try {
      const response = await axios.post('/api/cliente/login', formData, {
        headers: {
          "skip_zrok_interstitial": "true",
        },
      });
      localStorage.setItem('authToken', response.data.token);
      fetchUserName(response.data.token);
      handleClose();
    } catch (err) {
      console.error("Erro ao fazer o login:", err);
    }
  };

  const fetchLogout = async () => {
    try {
      localStorage.removeItem('authToken');
      setIsLogged(false);
      setName({ name: "", email: "", phone: "", adress: "" });
      handleClose();
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.put('/api/cliente/profile', name, {
        headers: {
          "skip_zrok_interstitial": "true",
          "Authorization": `Bearer ${token}`,
        },
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Erro ao salvar os dados:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUserName(token);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <>
      <div className="header">
        <a href="/">
          <img src={PetLinkLogo} alt="Logo da Pet Link" className="logo-pet-link" />
        </a>
        <div className="opcoes-header">
          <a href="/banho-tosa" className="a-header">Agendar</a>
          <a href="/produtos" className="a-header">Produtos</a>
          <a href="/carrinho" className="a-header">Carrinho</a>
          {isLogged ? (
            <button className="butao-header" onClick={handleOpen}>{name.name}</button>
          ) : (
            <button className="butao-header" onClick={handleOpen}>Login</button>
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
          {isLogged ? (
            <>
              <TextField
                fullWidth
                label="Nome"
                name="name"
                margin="normal"
                value={name.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                margin="normal"
                value={name.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <TextField
                fullWidth
                label="Telefone"
                name="phone"
                margin="normal"
                value={name.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <TextField
                fullWidth
                label="Endereço"
                name="adress"
                margin="normal"
                value={name.adress}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <Button
                startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                sx={{
                  bgcolor: "black",
                  color: "white",
                  width: "100%",
                  marginTop: "2%",
                }}
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
              >
                {isEditing ? "Salvar" : "Editar"}
              </Button>
              <Button
                color="error"
                variant='contained'
                startIcon={<LogoutIcon />}
                sx={{
                  width: "100%",
                  marginTop: "2%",
                }}
                onClick={fetchLogout}
              >
                Sair
              </Button>
            </>
          ) : (
            <>
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
                type="password"
                onChange={handleChange}
                sx={{ bgcolor: 'white' }}
              />
              <a href="/registro">Cadastre-se</a>
              <Button
                color="error"
                sx={{
                  bgcolor: "black",
                  color: "white",
                  width: "100%",
                  marginTop: "2%",
                }}
                onClick={fetchLogin}
              >
                Login
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Header;
