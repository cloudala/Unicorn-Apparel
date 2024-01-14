import React, { useContext } from "react";
import { ProductContext } from '../contexts/ProductContext';
import { ShoppingCartContext } from '../contexts/ShoppingCartContext';
import CartItemCard from "./CartItemCard";
import CheckoutButton from './CheckoutButton'
import formatCurrency from "../utils/currencyFormatter";

export default function ShoppingCart() {
    const { products, setProducts } = useContext(ProductContext);
    const { cartItems } = useContext(ShoppingCartContext)
    const productsInCart = products.filter(product => cartItems.some(item => item.id === product.id));
    const subtotal = cartItems.reduce((subtotal, item) => {
        const productPrice = products.find(product => product.id === item.id).price
        return subtotal + item.quantity*productPrice
    }, 0)
    const shippingCost = subtotal === 0 ? 0 : 10.99
    const checkoutDisabled = subtotal === 0

    return (
        <div className="min-h-screen">
            <h1 className="text-4xl font-bold my-6 px-5">Your Cart</h1>
            <div className="my-10 px-5 bg-white flex">
                <div className="w-3/5">
                    <ul className="grid grid-cols-1 gap-4 w-full">
                    {productsInCart.map((product, id) => <CartItemCard key={id} product={product}/>)}
                    </ul>
                </div>
                <div className="w-2/5 max-h-80 bg-gray-50 rounded-lg p-10 ml-5">
                    <h2 className="text-xl font-semibold mb-6">Order Summary:</h2>
                    <div className="flex justify-between my-3 border-b border-gray-300 pb-3">
                        <p className="">Subtotal:</p>
                        <p>{formatCurrency(subtotal)}</p>
                    </div>
                    <div className="flex justify-between my-3 border-b border-gray-300 pb-3">
                        <p className="">Shipping estimate:</p>
                        <p>{formatCurrency(shippingCost)}</p>
                    </div>
                    <div className="flex justify-between my-3 pb-3">
                        <p className="text-xl font-semibold">Order Total:</p>
                        <p className="text-xl font-semibold">{formatCurrency(subtotal + shippingCost)}</p>
                    </div>
                    <CheckoutButton text='Checkout' checkoutDisabled={checkoutDisabled}/>
                </div>
            </div>
        </div>
    )
}