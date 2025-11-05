import { useState } from 'react';

export const useNameSearch = () => {
  const [name, setName] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return { name, setName, handleSearchChange };
};
