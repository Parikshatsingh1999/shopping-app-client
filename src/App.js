
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Collection from './pages/Collection';
import Product from './pages/Product';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import AdminProfile from './components/Admin/AdminPages/Profile/AdminProfile';
import CollectionList from './components/Admin/AdminPages/Collection/CollectionList';
import AdminCollection from './components/Admin/AdminPages/Collection/CollectionAdmin';
import ProductsList from './components/Admin/AdminPages/Products/ProductsList';
import UserList from './components/Admin/AdminPages/Users/UserList';
import ProductAdmin from './components/Admin/AdminPages/Products/ProductAdmin';
import UserAdmin from './components/Admin/AdminPages/Users/UserAdmin';

function App() {
  return (
    <div className="App">
      <Header />
      <main className='app-main full-width '>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/collections/:collectionId' element={<Collection />} />
          <Route exact path='/products/:productId' element={<Product />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/admin" element={<Admin />} >
            <Route path="" element={<AdminProfile />} />
            <Route path="collections" element={<CollectionList />} />
            <Route path="collections/:collectionId" element={<AdminCollection />} />
            <Route path="products" element={<ProductsList />} />
            <Route path="products/:productId" element={<ProductAdmin />} />
            <Route path="users" element={<UserList />} />
            <Route path="users/:userId" element={<UserAdmin />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
