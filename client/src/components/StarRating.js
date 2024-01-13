import React, { useContext, useState } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import { FaStar } from 'react-icons/fa';

export default function StarRating() {
//   const { id } = useParams();
//   const photoId = parseInt(id);
//   const { userRatings, setUserRatings } = useContext(PhotosContext);
//   const [hover, setHover] = useState(null);

  function handlePhotoRating(photoIndex, ratingValue) {
    // const updatedUserRatings = [...userRatings];
    // updatedUserRatings[photoIndex] = {
    //   ...updatedUserRatings[photoIndex],
    //   rating: ratingValue,
    // };
    // setUserRatings(updatedUserRatings);
  }

  return (
    <div className="flex items-center mt-2.5 mb-5">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              className='hidden'
              type="radio"
              name="rating"
              checked={ratingValue === 4}
            //   onChange={() => handlePhotoRating(id, ratingValue)}
            />
            <FaStar
              className="flex gap-1"
              color={
                ratingValue <= (4)
                  ? 'gold'
                  : 'gray'
              }
            />
          </label>
        );
      })}
       <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">4.0</span>
    </div>
  );
}
