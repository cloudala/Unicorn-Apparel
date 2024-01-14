import React from "react";
import StarRating from "./StarRating";

export default function ProductDetails({product}) {
    return (
        <div className="flex my-5 gap-10">
            <div className="w-1/2 rounded-t-lg">
                <img className="h-full w-full object-cover rounded-lg" src={product.imageUrl} alt={product.title} />
            </div>
            <div className="w-1/2 flex flex-col">
                <div className="text-4xl font-bold text-gray-900 dark:text-white">{product.title}</div>
                <StarRating/>
                <div className="w-3/4 py-2">{product.longDescription}</div>
                <h1 className="text-4xl font-bold text-gray-900 my-3">{product.price} PLN</h1>
                <p>Delivery options:</p>
                <ul>
                    {product.deliveryOptions.map((deliveryOption, id) => <li key={id}>{deliveryOption.option}: {deliveryOption.price} PLN</li>)}
                </ul>
            </div>
        </div>
    )
}