import React from 'react'
import SecondaryButton from './SecondaryButton';
import PrimaryButton from './PrimaryButton';

export default function NavBar() {
    return (
        <header className='flex justify-between items-center w-full bg-white shadow-lg dark:bg-gray-800 dark:border-gray-700 p-3'>
            <h2 className='font-bold'>Logo</h2>
            <nav className='w-2/4'>
                <ul className='flex justify-evenly'>
                    <li>Home</li>
                    <li>Store</li>
                    <li>More</li>
                </ul>
            </nav>
            <div>
                <SecondaryButton text='Sign up'/>
                <PrimaryButton text='Log in'/>
            </div>
        </header>
    )
}