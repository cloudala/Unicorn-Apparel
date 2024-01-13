import React, { createContext, useState } from 'react';
import dummyProducts from '../data/dummyProducts.json'
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    // Just for now to focus on creating data displaying components - later change to fetch the data
    const initialProducts = dummyProducts.products
    const [products, setProducts] = useState(initialProducts);

    return (
    <ProductContext.Provider
        value={{
        products,
        setProducts,
        }}
    >
        {children}
    </ProductContext.Provider>
    );
};
