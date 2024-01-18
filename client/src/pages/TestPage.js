import React, { useReducer, useEffect } from 'react';
import useFetch from '../hooks/useFetch';

// Define your reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_API':
      return { ...state, api: action.payload };
    default:
      return state;
  }
};

const YourComponent = () => {
  // Initialize state using useReducer
  const [state, dispatch] = useReducer(reducer, { api: 'http://localhost:4000/api/products' });
  
  // Destructure state
  const { api } = state;

  // Use the useFetch hook with the current API endpoint
  const { data, loading, error } = useFetch(api);

  // Example: change the API endpoint when a button is clicked
  const handleButtonClick = () => {
    dispatch({ type: 'SET_API', payload: 'http://localhost:4000/api/products/12bf1017-9f9e-4651-9a82-6d36fa2e79c3/reviews' });
  };

  useEffect(() => {
    // You can perform additional actions after fetching data if needed
    // For example, you might want to update the UI or perform other logic
    // based on the fetched data.
  }, [data]);

  return (
    <div>
      {/* Render your UI based on the fetched data, loading state, and error state */}
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data</p>}
      {data && (
        <>
          <p>Data: {JSON.stringify(data)}</p>
          <button onClick={handleButtonClick}>Change API</button>
        </>
      )}
    </div>
  );
};

export default YourComponent;
