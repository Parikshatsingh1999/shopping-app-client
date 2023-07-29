
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Collection from './pages/Collection';
import Product from './pages/Product';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Header />
      <main className='app-main full-width '>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/collections/:id' element={<Collection />} />
          <Route exact path='/products/:id' element={<Product />} />
          <Route exact path="/login" element={<Login />} />
          <Route path='*' element={<NotFound />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
