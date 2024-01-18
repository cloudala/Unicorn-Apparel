import React from "react";
import Available from "./Available";
import formatCurrency from '../utils/currencyFormatter'
import EditProductButton from '../components/EditProductButton'
import DeleteProductButton from '../components/DeleteProductButton'

export default function AdminProductCard({product}) {
    return (
        <div className="relative w-full bg-white border border-gray-200 rounded-lg shadow group overflow-hidden flex justify-start items-center">
            <div className="h-64 w-64 rounded-t-lg my-5 mx-5">
                <img className="h-full w-full object-cover rounded-lg" src={product.imageUrl} alt={product.title} />
            </div>
            <div className="px-5 pb-5">
                <div>
                    <div>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(product.price)}</div>
                    </div>
                </div>
                <Available count={product.count}/>
            </div>
            <div className="flex gap-3 ml-auto mr-5">
                <EditProductButton text="Edit Product"/>
                <DeleteProductButton text="Delete Product"/>
            </div>
        </div>
    )
}
