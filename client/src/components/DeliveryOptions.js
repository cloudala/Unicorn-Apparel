import React from 'react'
import currencyFormatter from '../utils/currencyFormatter'
import { FaTruck } from 'react-icons/fa';

export default function DeliveryOptions() {
    return (
        <div>
            <h2 className="font-semibold text-l">Delivery Options:</h2>
            <div className="flex items-center text-1xl font-semibold text-gray-900 dark:text-white"><FaTruck className="mr-2"/>InPost: {currencyFormatter(7.99)}</div>
            <div className="flex items-center text-1xl font-semibold text-gray-900 dark:text-white"><FaTruck className="mr-2"/>Kurier: {currencyFormatter(10.99)}</div>
        </div>
    )
}