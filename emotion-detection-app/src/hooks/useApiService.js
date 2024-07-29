// hooks/useApiService.js
import { useState } from 'react';

const useApiService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendData = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/add_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setIsLoading(false);
      return result;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      throw error;
    }
  };

  return { sendData, isLoading, error };
};

export default useApiService;