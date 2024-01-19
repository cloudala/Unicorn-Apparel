import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProductProvider } from './contexts/ProductContext';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';
import { OrderDataProvider } from './contexts/OrderDataContext';
import { DeliveryProvider } from './contexts/DeliveryContext';
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import ScrollToTop from './components/ScrollToTop'
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <DeliveryProvider>
          <ShoppingCartProvider>
            <OrderDataProvider>
              <ScrollToTop/>
              <App />
              <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={{ type: 'Bounce' }}
              />
            </OrderDataProvider>
          </ShoppingCartProvider>
        </DeliveryProvider>
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
