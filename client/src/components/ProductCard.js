import React from "react";
import StarRating from "./StarRating";
import SecondaryButton from './SecondaryButton';
import PrimaryButton from './PrimaryButton';
import DisabledPrimaryButton from "./DisabledPrimaryButton";
import Available from "./Available";
import { FaTruck } from 'react-icons/fa';

export default function ProductCard({product}) {
    return (
        <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 group overflow-hidden">
            <div className="h-64 w-64 rounded-t-lg mx-auto my-5">
                <img className="h-full w-full object-cover rounded-lg" src={product.imageUrl} alt={product.title} />
            </div>
            <div className="px-5 pb-5">
                <div className="flex justify-between">
                    <div>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
                        <StarRating/>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">{product.price} PLN</div>
                        <div className="flex items-center text-1xl font-semibold text-gray-900 dark:text-white"><FaTruck className="mr-2"/> from 7.99 PLN</div>
                    </div>
                </div>
                <Available count={product.count}/>
                <p className="pb-5">{product.shortDescription}</p>
                {/* Maybe change opacity to display:none */}
                <div className="flex items-center justify-around opacity-0 group-hover:opacity-100 transition-opacity">
                    <SecondaryButton text='Show Details'/>
                    {product.count > 0 ? <PrimaryButton text='Add to cart'/> : <DisabledPrimaryButton text='Add to cart'/>}
                </div>
            </div>
        </div>
    )
}
