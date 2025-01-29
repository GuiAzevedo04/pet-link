import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import axios from 'axios';
import './Registro.css';
import Logo from '../../assets/PetLinkLogo.png';
import CachorroRegistro from '../../assets/images/Registro.png';

const Registro = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false)
  const [usuario, setUsuario] = useState({
    name: '',
    email: '',
    phone: '',
    adress: '',
    password: '',
    confirmPassword: '',
    cpf: '',
  });

  const [errors, setErrors] = useState({
    email: false,
    passwordsMatch: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    // Expressão regular para validação básica de e-mail
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    // Validação de e-mail
    if (!validateEmail(usuario.email)) {
      setErrors((prev) => ({ ...prev, email: true }));
      console.error("E-mail inválido.");
      return;
    } else {
      setErrors((prev) => ({ ...prev, email: false }));
    }

    // Verificação se as senhas conferem
    if (usuario.password !== usuario.confirmPassword) {
      setErrors((prev) => ({ ...prev, passwordsMatch: false }));
      console.error("As senhas não conferem.");
      return;
    } else {
      setErrors((prev) => ({ ...prev, passwordsMatch: true }));
    }

    // Se passar na validação, tenta enviar os dados para o servidor
    try {
      const response = await axios.post('/api/cliente/register', {
        name: usuario.name,
        email: usuario.email,
        phone: usuario.phone,
        adress: usuario.adress,
        password: usuario.password,
        cpf: usuario.cpf,
      }, {
        headers: {
          'skip_zrok_interstitial': 'true',
        },
      });
      console.log('Usuário cadastrado:', response.data);
      setSuccess(true);

      setTimeout(() => {
        navigate('/');
      }, 2000);
  
    } catch (err) {
      console.error('Falha ao registrar usuário:', err);
    }
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
  }

  return (
    <div className="registro">
      <div className="form-registro">
        <img src={Logo} alt="Logo PetLink" className="logo-registro" />
        <TextField
          fullWidth
          label="Nome"
          name="name"
          margin="normal"
          onChange={handleChange}
        />
        {/* Campo CPF com máscara */}
        <InputMask
          mask="999.999.999-99"
          value={usuario.cpf}
          onChange={(e) => handleChange({ target: { name: 'cpf', value: e.target.value } })}
        >
          {(inputProps) => (
            <TextField
              {...inputProps}
              fullWidth
              label="CPF"
              name="cpf"
              margin="normal"
            />
          )}
        </InputMask>
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
          name="confirmPassword"
          margin="normal"
          type="password"
          onChange={handleChange}
          error={!errors.passwordsMatch}
          helperText={!errors.passwordsMatch ? "As senhas não conferem" : ""}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          onChange={handleChange}
          error={errors.email}
          helperText={errors.email ? "E-mail inválido" : ""}
        />
        {/* Campo Telefone com máscara */}
        <InputMask
          mask="(99) 99999-9999"
          value={usuario.phone}
          onChange={(e) => handleChange({ target: { name: 'phone', value: e.target.value } })}
        >
          {(inputProps) => (
            <TextField
              {...inputProps}
              fullWidth
              label="Telefone"
              name="phone"
              margin="normal"
            />
          )}
        </InputMask>
        <TextField
          fullWidth
          label="Endereço"
          name="adress"
          margin="normal"
          onChange={handleChange}
        />
        <Button
          startIcon={<HowToRegIcon />}
          onClick={handleSubmit}
          sx={{
            bgcolor: 'black',
            color: 'white',
            width: '100%',
            marginTop: '2%',
          }}
        >
          Registrar
        </Button>
      </div>
      <img src={CachorroRegistro} alt="Cachorro fazendo compras" className="cachorro-registro" />

      <Snackbar
        open={success}
        autoHideDuration={3000} // Fecha automaticamente após 3 segundos
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Posição no canto superior
      >
        <Alert onClose={handleCloseSuccess} variant='filled' severity="success" sx={{ width: '100%' }}>
          Cadastro realizado com sucesso!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Registro;
