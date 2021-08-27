import { useState, useEffect } from 'react';

const useFetch = (url: string, options: RequestInit, initialState: any) => {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((error) => setError(error));
  }, [url]);

  return { data, error };
};

export default useFetch;
