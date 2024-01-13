import { useContext } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProductDetails from './components/ProductDetails'
import { ProductContext } from './contexts/ProductContext';

export default function App() {
  const { products, setProducts } = useContext(ProductContext);
  return (
    <>
      <NavBar/>
      <ProductList/>
      <ProductDetails product={products[0]}/>
      <Footer/>
    </>
  )
}