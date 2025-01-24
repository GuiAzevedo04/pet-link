import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const PopUpAdm = ({
  modalAberto,
  produtoSelecionado,
  handleFecharModal,
  novoProduto,
  handleChange,
  handleAdicionarProduto,
  handleEditarProduto,
  handleDeletarProduto,
}) => {

  const [produtoEditado, setProdutoEditado] = useState(produtoSelecionado);

  useEffect(() => {
    if(modalAberto === 'editar' && produtoSelecionado){
      setProdutoEditado({...produtoSelecionado});
    }
  }, [modalAberto, produtoSelecionado]);

  const handleEditarCampo = (e) => {
    const { name, value } = e.target;
    setProdutoEditado((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Modal para Adicionar Produto */}
      {modalAberto === 'adicionar' && (
        <Modal open={true} onClose={handleFecharModal}>
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
            <h2>Adicionar Produto</h2>
            <TextField
              fullWidth
              label="Nome do Produto"
              name="name"
              value={novoProduto.name}
              onChange={handleChange}
              margin="normal"
              sx={{ bgcolor: 'white' }}
            />
            <TextField
              fullWidth
              label="Preço"
              name="price"
              type="number"
              value={novoProduto.price}
              onChange={handleChange}
              margin="normal"
              sx={{ bgcolor: 'white' }}
            />
            <TextField
              fullWidth
              label="Link da Imagem"
              name="imageLink"
              value={novoProduto.imageLink}
              onChange={handleChange}
              margin="normal"
              sx={{ bgcolor: 'white' }}
            />
            <TextField
              fullWidth
              label="Quantidade"
              name="amount"
              value={novoProduto.amount}
              onChange={handleChange}
              margin="normal"
              sx={{ bgcolor: 'white' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <Button onClick={handleFecharModal} style={{ marginRight: 8 }} sx={{ bgcolor: 'red', color: 'white' }}>Cancelar</Button>
              <Button variant="contained" color="primary" onClick={handleAdicionarProduto} sx={{ bgcolor: 'black' }}>Adicionar</Button>
            </div>
          </Box>
        </Modal>
      )}

      {/* Modal para Editar Produto */}
      {modalAberto === 'editar' && produtoSelecionado && (
        <Modal open={true} onClose={handleFecharModal}>
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
            <h2>Editar Produto</h2>
            <TextField
              fullWidth
              label="Nome do Produto"
              name="name"
              value={produtoEditado?.name || ''}
              onChange={handleEditarCampo}
              margin="normal"
              sx={{ bgcolor: 'white' }}
            />
            <TextField
              fullWidth
              label="Preço"
              name="price"
              type="number"
              value={produtoEditado?.price || ''}
              onChange={handleEditarCampo}
              margin="normal"
              sx={{ bgcolor: 'white' }}
            />
            <TextField
              fullWidth
              label="Link da Imagem"
              name="imageLink"
              value={produtoEditado?.imageLink || ''}
              onChange={handleEditarCampo}
              margin="normal"
              sx={{ bgcolor: 'white' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <Button onClick={handleFecharModal} style={{ marginRight: 8 }} sx={{ bgcolor: 'red', color: 'white' }}>Cancelar</Button>
              <Button variant="contained" color="primary" onClick={() => handleEditarProduto(produtoEditado)} sx={{ bgcolor: 'black' }}>Salvar</Button>
            </div>
          </Box>
        </Modal>
      )}

      {/* Modal para Deletar Produto */}
      {modalAberto === 'deletar' && produtoSelecionado && (
        <Modal open={true} onClose={handleFecharModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#f8d7da',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}>
            <h2>Deletar Produto</h2>
            <p>Tem certeza que deseja deletar o produto <strong>{produtoSelecionado.name}</strong>?</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <Button onClick={handleFecharModal} style={{ marginRight: 8 }} sx={{ bgcolor: 'gray', color: 'white' }}>Cancelar</Button>
              <Button variant="contained" color="error" onClick={() => handleDeletarProduto(produtoSelecionado.id)}>Deletar</Button>
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default PopUpAdm;
