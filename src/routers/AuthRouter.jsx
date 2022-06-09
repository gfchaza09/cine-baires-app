import React from 'react';
import { Routes, Route, useLocation} from 'react-router-dom';

// Páginas públicas
import LoginScreen from '../components/pages/auth/Login/LoginScreen';
import RegisterScreen from '../components/pages/auth/Register/RegisterScreen';

// Ruta a la aplicación
import AppRouter from './AppRouter';
import PrivateRouter from './PrivateRouter';

// const Error404 = lazy(()=> import('../components/pages/Error404/Error404'));

const AuthRouter = () => {

  const location = useLocation();
  
  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginScreen/>} />
        <Route path="/register" element={<RegisterScreen/>} />

        <Route path='*' element= {
          <PrivateRouter>
            <AppRouter />
          </PrivateRouter>
        } />
        {/* <Route path='*' element= {<Suspense fallback={<>...</>}><Error404 /></Suspense>} /> */}
      </Routes>
    </>
  )
}

export default AuthRouter;