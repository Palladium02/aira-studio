import { useState, useCallback, ChangeEvent } from 'react';

const useInput = (initialState: any) => {
  const [value, setValue] = useState(initialState);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  }, []);

  return [value, handleChange];
};

export default useInput;
