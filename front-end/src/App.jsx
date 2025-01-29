import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Componentes
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Páginas
import MainPage from './pages/MainPage/MainPage';
import BanhoTosa from './pages/BanhoTosa/BanhoTosa';
import Produtos from './pages/Produtos/Produtos';
import Carrinho from './pages/Carrinho/Carrinho';
import ProdutosDetalhes from './pages/ProdutosDetalhes/ProdutosDetalhes';
import AdminPage from './pages/AdminPage/AdminPage';
import Registro from './pages/Registro/Registro';

function AppContent() {
  const location = useLocation();

  // Rotas onde o Header e Footer não devem aparecer
  const hideHeaderFooter = location.pathname === '/registro';

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/banho-tosa" element={<BanhoTosa />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produtos/:id" element={<ProdutosDetalhes />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
