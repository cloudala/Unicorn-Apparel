import React, {useContext} from "react";
import ProductCard from "./ProductCard";
import { ProductContext } from '../contexts/ProductContext';

export default function ProductList() {
    const { products, setProducts } = useContext(ProductContext);
    return (
        <div className="flex items-center justify-center">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 py-10">
            {products.map((product, id) => <ProductCard key={id} product={product}/>)}
            </ul>
        </div>
    )
}