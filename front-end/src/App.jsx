import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Componentes
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'


//Páginas
import MainPage from './pages/MainPage/MainPage'
import BanhoTosa from './pages/BanhoTosa/BanhoTosa';
import Produtos from './pages/Produtos/Produtos';



function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/banho-tosa" element={<BanhoTosa />} />
        <Route path="/produtos" element={<Produtos />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App
