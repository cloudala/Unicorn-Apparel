import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import NavBar from './components/NavBar';
import ShoppingCart from './components/ShoppingCart'
import Footer from './components/Footer';
import { ProductContext } from './contexts/ProductContext';
import CheckoutForm from './components/CheckoutForm';

export default function App() {
  const { products, setProducts } = useContext(ProductContext);
  return (
    <>
      <NavBar/>
        <Routes>
          <Route path='/' element={<ProductList/>}/>
          <Route path='/store' element={<h1>Store</h1>}/>
          <Route path='/admin' element={<h1>Admin Panel</h1>}/>
          <Route path='/cart' element={<ShoppingCart/>}/>
          <Route path='/cart/checkout' element={<CheckoutForm/>}/>
        </Routes>
      <Footer/>
    </>
  )
}