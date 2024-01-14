import React from 'react'
import StarRating from './StarRating'

export default function Review({ review }) {
    return (
        <div className='bg-gray-50 rounded-lg p-10 w-full'>
            <StarRating value={review.rating}/>
            <h2 className='font-semibold px-2 pb-3'>{review.reviewerName}</h2>
            <p className='bg-white w-full p-2 rounded-lg'>{review.reviewBody}</p>
        </div>
    )
}