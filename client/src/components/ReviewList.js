import React, {useState} from 'react'
import dummyReviews from '../data/dummyReviews.json'
import Review from './Review'

export default function ReviewList() {
    const [reviews, setReviews] = useState(dummyReviews.reviews)
    return (
        <div className='flex flex-col gap-5 w-1/2'>
            <h2 className='font-semibold text-xl'>Reviews:</h2>
            {reviews.map((review, index) => <Review key={index} review={review}/>)}
        </div>
    )
}