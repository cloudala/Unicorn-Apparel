import React from 'react';
import Rating from '@mui/material/Rating';

export default function StarRating({value}) {
  return (
    <div className="flex items-center mt-2.5 mb-5">
       <Rating name="read-only" value={value} precision={0.1}readOnly />
       <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{value}</span>
    </div>
  );
}
