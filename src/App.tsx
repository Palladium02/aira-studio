import { useEffect, useState } from 'react';
import useFetch from './hooks/useFetch';
import UserContext from './contexts/UserContext';
import AccessControlContainer from './pages/AccessControl/accessControl';
import AppHeader from './components/AppHeader';
import AppBody from './components/AppBody';
import './App.css';

const AppContainer = (): JSX.Element => {
  document.title = 'Aira Studio';
  const [user, setUser] = useState({ username: '', id: '', email: '' });

  const loadUserdata = async () => {
    let response = await (await fetch('/api/db/getUserInfo')).json();
    setUser(response);
  };

  useEffect(() => {
    loadUserdata();
  }, []);

  return (
    <div className="app">
      <UserContext.Provider value={{ user, setUser }}>
        <AppHeader username={user.username} />
        <AppBody />
      </UserContext.Provider>
    </div>
  );
};

const App = (): JSX.Element => {
  let isAuth = useFetch('/auth/isAuth', { method: 'POST' }, false).data.isAuth;
  return <>{isAuth ? <AppContainer /> : <AccessControlContainer />}</>;
};

export default App;
