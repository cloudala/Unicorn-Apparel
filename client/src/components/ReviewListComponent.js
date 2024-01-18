import React from 'react'
import Loading from './Loading';
import useFetch from '../hooks/useFetch';
import ReviewList from './ReviewList'

export default function ReviewListComponent({ id }) {
    const { data, loading, error } = useFetch(
        `http://localhost:4000/api/products/${id}/reviews`
    );
    return (
        <div className='flex flex-col gap-5 w-1/2'>
          {loading ? (
            <Loading/>
          ) : !error && data && data.reviews ? (
            <ReviewList reviews={data.reviews}/>
          ) : (
            <p>Error fetching data</p>
          )}
        </div>
    );
}
