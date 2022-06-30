import { Routes, Route, useLocation} from 'react-router-dom';

// Páginas públicas
import LoginScreen from '../components/pages/auth/Login/LoginScreen';
import RegisterScreen from '../components/pages/auth/Register/RegisterScreen';

// Ruta a la aplicación
import AppRouter from './AppRouter';

// Protección de rutas
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

const AuthRouter = () => {

  const location = useLocation();
  
  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<PublicRouter><LoginScreen/></PublicRouter>} />
        <Route path="/register" element={<PublicRouter><RegisterScreen/></PublicRouter>} />

        <Route path='*' element= {
          <PrivateRouter>
            <AppRouter />
          </PrivateRouter>
        } />
      </Routes>
    </>
  )
}

export default AuthRouter;