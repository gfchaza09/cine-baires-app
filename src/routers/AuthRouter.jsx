import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// Páginas públicas
import LoginScreen from '../pages/LoginScreen';
import RegisterScreen from '../pages/RegisterScreen';

// Rutas a la aplicación
import PrivateRouter from './PrivateRouter';
import AppRouter from './AppRouter';

const AuthRouter = () => {
  
  return (
    <>
    <Router>
      <Routes>
        <Route>
          <Route path="/" element={<LoginScreen/>}/>
          <Route path="register" element={<RegisterScreen/>}/>

          <Route path='*' element= {
            <PrivateRouter>
              <AppRouter />
            </PrivateRouter>
          } />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default AuthRouter;