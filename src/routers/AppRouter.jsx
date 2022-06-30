import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

//Componentes
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

// Páginas
import Home from '../components/pages/Home/Home';
import Listado from '../components/pages/Listado/Listado';
import Buscador from '../components/pages/Buscador/Buscador';
import Detalle from '../components/pages/Detalle/Detalle';
import Favoritos from '../components/pages/Favoritos/Favoritos';

// Acciones
import { login } from '../store/actions/auth';
import { favAdd, favRead, favRemove } from '../store/actions/fav';
import { loadData } from '../helpers/loadData';

const Error404 = lazy(()=> import('../components/pages/Error404/Error404'));

const AppRouter = () => {

  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataFav = useSelector(state => state.fav.data);

  useEffect(() => {
    onAuthStateChanged(auth, async (user)=>{
      if (user) {        
        dispatch(login(user.uid, user.displayName, user.email, user.photoURL));
        const favoritosData = await loadData(user.uid);
        dispatch(favRead(favoritosData));
      } else {
        navigate('/login', {replace: true});
      }
    });
  }, [dispatch]);

  const handleFavorites = (e) => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgUrl = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("h3").textContent;
    const overview = parent.querySelector("p").textContent;
    const movieData = {
      imgUrl, title, overview, 
      id: btn.dataset.movieId
    }

    if (favCheck(movieData.id)) {
      dispatch(favRemove(movieData.id))
    } else {
      dispatch(favAdd(movieData))
    }
    favCheck(movieData.id);
  };

  const favCheck = (id) => {
    let movieIsInFavs = dataFav.find(movie=>{
      return movie.movieData.id === id
    })
    return movieIsInFavs;
  }

  return (
    <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path='listado' element={ <Listado handleFavorites={ handleFavorites } favCheck={favCheck}/>} />
          <Route path="detalle" element={ <Detalle />} />
          <Route path='favoritos' element={ <Favoritos handleFavorites={ handleFavorites } favCheck={favCheck}/>} />
          <Route path='buscador' element={ <Buscador handleFavorites={ handleFavorites } favCheck={favCheck}/>} />
          <Route path='*' element= {<Suspense fallback={<>...</>}><Error404 /></Suspense>} />
        </Routes>
        <Footer />
    </>
  )
}

export default AppRouter