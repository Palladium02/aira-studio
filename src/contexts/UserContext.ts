import React, { createContext } from 'react';

interface IUserContext {
  user: {
    email: string;
    id: string;
    username: string;
  };
  setUser: any;
}

const UserContext = createContext<IUserContext>({
  user: {
    email: '',
    id: '',
    username: '',
  },
  setUser: null,
});

export default UserContext;
