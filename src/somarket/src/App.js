import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBarr';
import { observer } from 'mobx-react-lite';
import { Context } from './index';
import { check } from './http/userAPI';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from './utils/consts';


const App = observer(() => {
  const {user} = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authenticate = async () => {
        const userData = await check();
        if (userData) {
            user.setUser(userData);
            user.setIsAuth(true);
        } else {
            user.setUser({});
            user.setIsAuth(false);
            if (location.pathname !== REGISTRATION_ROUTE) {
              navigate(LOGIN_ROUTE)
            }
        }
    };

    authenticate();
  }, [navigate, location.pathname, user]);

  return (
    <>
      <NavBar />
      <AppRouter />
    </>
  );
});

export default App;
